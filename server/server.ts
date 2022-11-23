const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

import { Application, Request, Response, NextFunction } from 'express';

const DIST_DIR : string = path.join(__dirname, '../build/');
const HTML_FILE : string = path.join(DIST_DIR, 'index.html');

// Serve static files
app.use(express.static(DIST_DIR));
app.use(express.static('../src/assets'));

// Serve index.html
app.get("/*", (req: Request, res: Response) => {
    res.status(200).sendFile(HTML_FILE);
});

// app.use("*", ) 

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});