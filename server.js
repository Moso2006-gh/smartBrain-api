const express = require("express");
const { use } = require("express/lib/application");
const cors = require("cors");
const { knex } = require("knex");
const bcrypt = require("bcrypt")

//controlers
const register = require("./controlers/register.js");
const signin = require("./controlers/signin.js");
const profile = require("./controlers/profile.js");
const image = require("./controlers/image.js");


const postgres = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
    }
});
const app = express();

app.use(express.json());
app.use(cors());

/**
 * Functions
 */

//SignIn
app.post("/signin", (req, res) => signin.handleSignIn(req, res, postgres, bcrypt))

//Register
app.post("/register", (req, res) => register.handleRegister(req, res, postgres, bcrypt))

//profile/:userId
app.get("/profile/:id", (req, res) => profile.HandleProfile(req, res, postgres));

//Amount of entry
app.put("/image", (req, res) => image.handleImage(req, res, postgres)); 

//API Call
app.post("/imageurl", (req, res) => image.handleAPICall(req, res))

const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log("running on " + PORT)
});



/*
 / --> res = this is working
 /signin --> POST success/fail
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT --> count
 */