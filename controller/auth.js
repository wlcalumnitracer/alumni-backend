const users = require("../db/models/users.js");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${process.cwd()}/.env` });

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Signup = async (req, res, next) => {
  try {
    const body = req.body;

    if (!["2"].includes(body.userType)) {
      return res.status(400).send({ message: "Invalid Usertype" });
    }

    const newUser = await users.create({
      userType: body.userType,
      username: body.username,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
      verification: false,
    });

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    if (!newUser) {
      return res.status(400).send({ message: "failed to create user" });
    }

    result.token = generateToken({
      id: result.id,
    });

    res.status(201).send({
      status: "succes",
      message: `User ${newUser.username} created`,
      data: result,
    });
  } catch (error) {
    console.log(`Error:${error}`);
    res.status(500).send(`Error on:${error}`);
  }
};

module.exports = {
  Signup,
};
