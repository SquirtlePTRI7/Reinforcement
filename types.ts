import { RequestHandler } from "express";

export type CohortRow = {
  key: number;
  username: string;
  score: number;
};

export type UserController = {
  createUser?: RequestHandler;
  getAllUsers?: RequestHandler;
  getOneUser?: RequestHandler;
  deleteUser?: RequestHandler;
};
