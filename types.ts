import { RequestHandler } from "express";

export type UserController = {
  createUser?: RequestHandler;
  getAllUsers?: RequestHandler;
  getOneUser?: RequestHandler;
  deleteUser?: RequestHandler;
  updateScore?: RequestHandler;
};
