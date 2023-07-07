import User from "../../models/user.model.js";
import { messages } from "../../constants/messages.constant.js";
import {
  encryptPassword,
  validateUserData,
  generateUserName,
} from "./utils/user.controller.utils.js";

/**
 * Controller method to register a new user
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, dateOfBirth } =
      req.body;

    const validity = await validateUserData({
      firstName,
      lastName,
      email,
      password,
    });
    if (validity.response !== 200)
      return res.status(validity.response).json({ message: validity.message });

    const encryptedPassword = await encryptPassword(password);
    const generatedUserName = await generateUserName(firstName, lastName);

    const newUser = await new User({
      firstName,
      lastName,
      userName: generatedUserName,
      email,
      password: encryptedPassword,
      gender,
      dateOfBirth,
    }).save();
    res
      .status(200)
      .json({ message: messages.success.controller.user.registered, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: messages.error.server.serverError, error });
  }
};
