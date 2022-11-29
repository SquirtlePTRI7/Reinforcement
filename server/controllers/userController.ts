import { Application, Request, Response, NextFunction } from "express";
const User = require("../model/model");
import { UserController } from "../../types";

const userController: UserController = {};

userController.createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

userController.getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

userController.getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    console.log('req.params.username ', req.params.username)
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      console.log("Cannot find user");
      return res
        .status(404)
        .json({ message: "Cannot find user", log: "Cannot find user" });
    } else {
      res.locals.user = user;
      console.log('res.locals.user ', res.locals.user)
      return next();
    }
  } catch (err) {
    return next({
      message: "unable to GET one user",
      log: "unable to GET one user " + err,
    });
  }
};

userController.deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

userController.addAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const filter = { username: req.body.username };
  const update = { $inc: {[req.body.action]:1, currentScore:req.body.value} };

  try {
    await User.findOneAndUpdate(filter, update);
    return next();
  } catch (err) {
    return next({
      message: "unable to UPDATE user",
      log: "unable to UPDATE user " + err,
    });
  }

}

module.exports = userController;
