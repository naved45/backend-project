const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

/**
 * - user register controller
 * - POST /api/auth/register
 */

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with email",
      status: "failed",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  /*res.cookies("token", token);*/ //i am commenting this line because this is giving error and adding new line

  res.cookie("token", token, {
    httpOnly: true, // prevents client-side JS from reading it
    secure: true, // only send over HTTPS
    sameSite: "strict", // optional, helps prevent CSRF
  });

  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });

  await emailService.sendRegistrationEmail(user.email, user.name);
}

/**
 *  - User Login Controller
 *  - POST /api/auth/login
 */

async function userLoginController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Email or password in Invalid",
    });
  }
  const isValidPassword = await user.comaprePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Email or password is Invalid",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  /*res.cookies("token", token);*/ //i am commenting this line because this is giving error and adding new line

  res.cookie("token", token, {
    httpOnly: true, // prevents client-side JS from reading it
    secure: true, // only send over HTTPS
    sameSite: "strict", // optional, helps prevent CSRF
  });

  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
};
