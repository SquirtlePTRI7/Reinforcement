import { RequestHandler } from "express";

export type LeaderboardRow = {
  key: number;
  username: string;
  score: number;
};

export type UserController = {
  createUser?: RequestHandler;
  getAllUsers?: RequestHandler;
  getOneUser?: RequestHandler;
  deleteUser?: RequestHandler;
  addAction?: RequestHandler;
};
