const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
import { Application, Request, Response, NextFunction } from "express";

router.post("/", userController.createUser, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.newUser);
});

router.get("/", userController.getAllUsers, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.users);
});

router.get(
  "/:username",
  userController.getOneUser,
  (req: Request, res: Response) => {
    console.log("Username found!");
    return res.status(200).json(res.locals.user);
  }
);

router.patch("/:username", userController.getOneUser, userController.updateScore, (req: Request, res: Response) => {
  console.log('updated yay!')
  return res.status(200).json(res.locals.updatedUser)
})

router.delete(
  "/:username",
  userController.getOneUser,
  userController.deleteUser,
  (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ message: res.locals.user.username + " has been deleted" });
  }
);

module.exports = router;
