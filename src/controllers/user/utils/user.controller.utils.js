import bcrypt from "bcrypt";
import User from "../../../models/user.model.js";
import { messages } from "../../../constants/messages.constant.js";
import {
  isValidEmail,
  isValidLength,
} from "../../../utilities/common.validation.js";
import { Shuffle } from "../constants/user.controller.constants.js";

/**
 * Utility method to validate the user data
 * @param {object} data
 * @returns {object} response
 * */
export const validateUserData = async (data) => {
  const { firstName, lastName, userName, email, password } = data;
  const dataValidity = {
    response: 400, // 400 is the default response code for bad data/request
    message: "",
  };

  if (!isValidEmail(email)) {
    dataValidity.message = messages.error.controller.user.invalidEmail;
    return dataValidity;
  }

  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    dataValidity.message = messages.error.controller.user.emailAlreadyExists;
    return dataValidity;
  }

  if (!isValidLength(firstName, 3, 20)) {
    dataValidity.message = messages.error.controller.user.invalidFirstName;
    return dataValidity;
  }

  if (!isValidLength(lastName, 3, 20)) {
    dataValidity.message = messages.error.controller.user.invalidLastName;
    return dataValidity;
  }

  if (userName && !isValidLength(userName, 3, 20)) {
    dataValidity.message = messages.error.controller.user.invalidUserName;
    return dataValidity;
  }

  if (!isValidLength(password, 6, 20)) {
    dataValidity.message = messages.error.controller.user.invalidPassword;
    return dataValidity;
  }

  dataValidity.response = 200; // 200 is the default response code for valid data/request if everything goes well
  return dataValidity;
};

/**
 * Utility method to encrypt the given password using bcrypt
 * @param {string} password
 * @returns {string} encryptedPassword
 * */
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

/**
 * Generates a random integer between the range of 0 to a user specified value
 * @param {number} limit default value is 10
 * @returns {number} random int
 */
const numberUpto = (limit = 10) => Math.floor(Math.random() * (limit + 1)); // +1 because formula gives no. less than limit-1

/**
 * returns a random special character from the allowed special characters array
 * @param {boolean} atEdge default value is false
 * @returns {string} special char
 * */
const getSpecialChar = (atEdge = false) => {
  const allowedSpecialChars = [".", "_"];
  return atEdge ? allowedSpecialChars[1] : allowedSpecialChars[numberUpto(1)];
};

/**
 * Generates a random username based on the user's first name and last name and checks if it already exists in the database or not
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string} userName
 * @defaultUsername Example: firstName = "John", lastName = "Doe" => johnDoe or doeJohn or _johnDoe or _doeJohn or johnDoe_ or doeJohn_
 * @todo Add length check for username and trim it if it exceeds the limit
 * @todo See if this functionality is needed later based upon the ui design
 * */
export const generateUserName = async (firstName, lastName) => {
  const defaultUserName = `${firstName.toLowerCase()}${lastName
    .toLowerCase()
    .charAt(0)
    .toUpperCase()}${lastName.slice(1)}`;

  let userNameAlreadyExists = await User.findOne({ userName: defaultUserName });

  if (!userNameAlreadyExists) return defaultUserName;

  let suggestedUsername = "";
  let counter = 1;
  while (userNameAlreadyExists) {
    const suffleType = numberUpto(2); // 0 or 1
    switch (suffleType) {
      case Shuffle.FirstLast:
        suggestedUsername =
          numberUpto(1) === 0
            ? firstName.toLowerCase() +
              getSpecialChar() +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1).toLowerCase() +
              counter +
              getSpecialChar(true)
            : getSpecialChar(true) +
              firstName.toLowerCase() +
              getSpecialChar() +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1).toLowerCase() +
              counter;
        break;
      case Shuffle.LastFirst:
        suggestedUsername =
          numberUpto(1) === 0
            ? getSpecialChar(true) +
              lastName.toLowerCase() +
              counter +
              getSpecialChar() +
              firstName.charAt(0).toUpperCase() +
              firstName.slice(1).toLowerCase()
            : lastName.toLowerCase() +
              counter +
              getSpecialChar() +
              firstName.charAt(0).toUpperCase() +
              firstName.slice(1).toLowerCase() +
              getSpecialChar(true);
        break;
      case Shuffle.Random:
        const maxAllowedNumber = 200;
        suggestedUsername =
          numberUpto(1) === 0
            ? getSpecialChar(true) +
              lastName.toLowerCase() +
              numberUpto(maxAllowedNumber) +
              getSpecialChar() +
              firstName.charAt(0).toUpperCase() +
              firstName.slice(1).toLowerCase() +
              getSpecialChar(true)
            : getSpecialChar(true) +
              firstName.toLowerCase() +
              getSpecialChar() +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1).toLowerCase() +
              numberUpto(maxAllowedNumber) +
              getSpecialChar(true);
        break;
      default:
        break;
    }
    userNameAlreadyExists = await User.findOne({ userName: suggestedUsername });
    if (!userNameAlreadyExists) break;
    counter++;
  }
  return suggestedUsername;
};
