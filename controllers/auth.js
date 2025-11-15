const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(
    password + process.env.PEPPER_KEY,
    salt
  );

  const tempUser = { name, email, password: hashpassword };

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json(user);
};
const login = (req, res) => {
  res.send("login the user");
};

module.exports = {
  register,
  login,
};
