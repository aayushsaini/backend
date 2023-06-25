import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { messages } from "../../constants/messages.constant.js";
import { isValidEmail, isValidLength } from "../../utilities/validation.js";

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

  if (!isValidLength(userName, 3, 20)) {
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
