const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MongoURI = process.env.MongoURI;

import { Application, Request, Response, NextFunction } from "express";

mongoose.connect(MongoURI);
const db = mongoose.connection;
db.on("error", () => console.log("Error connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

const DIST_DIR: string = path.join(__dirname, "../build/");
const HTML_FILE: string = path.join(DIST_DIR, "index.html");

// Serve static files
app.use(express.static(DIST_DIR));
app.use(express.static("../src/assets"));

// Serve index.html
app.get("/*", (req: Request, res: Response) => {
  res.status(200).sendFile(HTML_FILE);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// app.use("*", )

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
