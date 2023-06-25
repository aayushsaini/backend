import User from "../models/user.model.js";
import { isValidEmail, isValidLength } from "../utilities/validation.js";
import { messages } from "../constants/messages.constant.js";

/**
 * Controller method to register a new user
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      gender,
      dateOfBirth,
    } = req.body;

    if (!isValidEmail(email))
      return res
        .status(400)
        .json({ message: messages.error.controller.user.invalidEmail });

    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists)
      return res
        .status(400)
        .json({ message: messages.error.controller.user.emailAlreadyExists });
    if (!isValidLength(firstName, 3, 20))
      return res
        .status(400)
        .json({ message: messages.error.controller.user.invalidFirstName });
    if (!isValidLength(lastName, 3, 20))
      return res
        .status(400)
        .json({ message: messages.error.controller.user.invalidLastName });
    if (!isValidLength(userName, 3, 20))
      return res
        .status(400)
        .json({ message: messages.error.controller.user.invalidUserName });
    if (!isValidLength(password, 6, 20))
      return res
        .status(400)
        .json({ message: messages.error.controller.user.invalidPassword });

    const newUser = await new User({
      firstName,
      lastName,
      userName,
      email,
      password,
      gender,
      dateOfBirth,
    }).save();
    res
      .status(200)
      .json({ message: messages.success.controller.user.registered, newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: messages.error.controller.server.serverError, error });
  }
};
