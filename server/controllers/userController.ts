import { Application, Request, Response, NextFunction } from "express";
const User = require("../model/model");
import { UserController } from "../../types";

const userController: UserController = {};

userController.createUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
  });
  try {
    const newUser = await user.save();
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next({
      message: "unable to CREATE user" + err,
      log: `unable to CREATE user ` + err,
    });
  }
};

userController.getAllUsers = async (req, res, next) => {
  console.log("getting all users...");
  try {
    const users = await User.find();
    res.locals.users = users;
    return next();
  } catch (err) {
    return next({
      message: "unable to GET users",
      log: "unable to GET users " + err,
    });
  }
};

userController.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      console.log("Cannot find user");
      return res
        .status(404)
        .json({ message: "Cannot find user", log: "Cannot find user" });
    } else {
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next({
      message: "unable to GET one user",
      log: "unable to GET one user " + err,
    });
  }
};

userController.updateScore = async (req, res, next) => {
  if (req.body.applicationSubmissions) {
    res.locals.user.applicationSubmissions = res.locals.user.applicationSubmissions + req.body.applicationSubmissions
    res.locals.user.currentScore = res.locals.user.currentScore + req.body.applicationSubmissions
  }
  // add more ifs
  try {
    const updatedUser = await res.locals.user.save();
    res.locals.updatedUser = updatedUser;
    console.log(res.locals.updatedUser)
    return next()
  } catch (err) {
    return next({
      message: "unable to PATCH one user",
      log: "unable to PATCH one user " + err,
    });
  }
}

userController.deleteUser = async (req, res, next) => {
  try {
    await res.locals.user.remove();
    return next();
  } catch (err) {
    return next({
      message: "unable to DELETE user",
      log: "unable to DELETE user " + err,
    });
  }
};
module.exports = userController;
