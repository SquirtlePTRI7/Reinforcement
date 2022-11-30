// const path = require("path");
// const cors = require('cors')
// const fetch = (...args: string[]) => {
//   import('node-fetch').then(({default: fetch}) => fetch(...args))
// }
// const bodyParser = require('body-parser')
// const express = require("express");
// const app = express();
// require("dotenv").config();
// const mongoose = require("mongoose");

// const PORT = process.env.PORT;
// const MongoURI = process.env.MongoURI;
// const CLIENT_ID = process.env.GITHUB_ID
// const CLIENT_SECRET = process.env.GITHUB_SECRET

// import { Application, Request, Response, NextFunction } from "express";

// mongoose.connect(MongoURI);
// const db = mongoose.connection;
// db.on("error", () => console.log("Error connecting to Database"));
// db.once("open", () => console.log("Connected to Database"));

// const DIST_DIR: string = path.join(__dirname, "../build/");
// const HTML_FILE: string = path.join(DIST_DIR, "index.html");

// // Serve static files
// app.use(express.static(DIST_DIR));
// app.use(express.static("../src/assets"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors())
// app.use(bodyParser.json())

// app.use("/users", require("./routes/userRoutes"));

// // Serve index.html
// app.get("/*", (req: Request, res: Response) => {
//   res.status(200).sendFile(HTML_FILE);
// });

// app.get('/getAccessToken', async function (req: Request, res: Response) {
//   const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code
//   await fetch("https://github.com/login/oauth/access_token" + params, {
//     method: "POST",
//     headers: {
//       "Accept": "application/json"
//     }
//   }).then((res) => {
//     return res.json()
//   }).then((data) => {
//     res.json(data)
//   })
// })

// app.get('/getUserData', async function (req: Request, res: Response) {
//   req.get("Authorization")
//   await fetch("https://api.github.com/user", {
//     method: "GET",
//     headers: {
//       "Authorizaiton": req.get("Authorization")
//     }
//   }).then((res) => {
//     return res.json()
//   }).then((data) => {
//     res.json(data)
//   })
// })

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 400,
//     message: { err: "An error occurred" },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// // app.use("*", )

// app.listen(PORT, () => {
//   console.log(`Server listening on Port ${PORT}`);
// });
