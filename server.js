/*Express Server for FaceRecognition app */

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

/* databse connection with knex.js */
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "smart-brain",
  },
});

/* middleware */
app.use(express.json());
app.use(cors());

/* endpoint GET '/' */
app.get("/", (req, res) => {
  res.send("success");
});

/* endpoint POST '/signin' */
app.post("/signin", signin.handleSignIn(bcrypt, db));

/* endpoint POST '/register' */
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

/* endpoint GET '/profile/:id' */
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

/* endpoint PUT '/image' */
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

/* endpoint POST '/image' */
app.post("/imagedetection", (req, res) => {
  image.handleAPICall(req, res);
});

/* endpoint POST '/gender' */
app.post("/gender", (req, res) => {
  image.handleGenderAPICall(req, res);
});

/* endpoint POST '/age' */
app.post("/age", (req, res) => {
  image.handleAgeAPICall(req, res);
});

/* endpoint POST '/ethnicity' */
app.post("/ethnicity", (req, res) => {
  image.handleEthnicityAPICall(req, res);
});

/*Express Server port listener on port 3001 */
app.listen(3001, () => {
  console.log("app is running on port 3000");
});
