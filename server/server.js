const path = require("path");
const cors = require('cors')
const fetch = (...args) => {
  import('node-fetch').then(({default: fetch}) => fetch(...args))
}
const bodyParser = require('body-parser')
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require('axios')

const PORT = process.env.PORT;
const MongoURI = process.env.MongoURI;
const CLIENT_ID = process.env.GITHUB_ID
const CLIENT_SECRET = process.env.GITHUB_SECRET

mongoose.connect(MongoURI);
const db = mongoose.connection;
db.on("error", () => console.log("Error connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

const DIST_DIR = path.join(__dirname, "../build/");
const HTML_FILE = path.join(DIST_DIR, "index.html");

// Serve static files
app.use(express.static(DIST_DIR));
app.use(express.static("../src/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json())

// app.use("/users", require("./routes/userRoutes"));

//2nd implementation
// app.get('/', (req, res) => {
//   // The req.query object has the query params that were sent to this route.
//   const requestToken = req.query.code
//   console.log(requestToken)
  
//   axios({
//     method: 'post',
//     url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
//     // Set the content type header, so that we get the response in JSON
//     headers: {
//          accept: 'application/json'
//     }    
//   }).then((response) => {    
//     const accessToken = response.data.access_token
//     console.log(response.data)    
//     // redirect the user to the home page, along with the access token
//     res.redirect(`/?access_token=${accessToken}`)
//   })
// })

//1st implementation
// app.get('/getAccessToken', async function (req, res) {
//   const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=302a717b057f1cf52c20"
//   await fetch("https://github.com/login/oauth/access_token" + params, {
//     method: "GET",
//     // headers: {
//     //   "Accept": "application/json"
//     // }
//   }).then((response) => {
//     return response.json()
//   }).then((data) => {
//       console.log(data)
//     return res.json(data)
//   }).catch(err => {
//     console.log('getAccessToken fetch error', err)
//   })
// })


app.post('/getAccessToken', async function (req, res) {
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=2ae318765b195e7554cd"
  // const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.body.code
  await axios.post("https://github.com/login/oauth/access_token" + params
  // , {
    // method: "POST",
    // headers: {
    //   "Accept": "application/json"
    // }
  // }
  ).then((response) => {
      console.log(response)
      console.log(typeof response.data)
      return res.json(response.data.slice(13, 53))
  }).catch(err => {
    console.log('getAccessToken axios error', err)
  })
})

app.get('/getUserData', async function (req, res) {
  req.get("Authorization")
  await axios.post("https://api.github.com/user", {
    headers: {
      "Authorization": req.get("Authorization")
    }
  }
  ).then((data) => {
    return res.json(data)
  })
})

// Serve index.html
app.get("/*", (req, res) => {
  res.status(200).sendFile(HTML_FILE);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});