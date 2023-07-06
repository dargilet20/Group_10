const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const crud = require("./DB/CRUD");
const createDb = require("./DB/createDB");
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//load view engine
app.set("view engine", "pug");

// sign up form route
app.get("/", (req, res) => {
    if (req.cookies.loggedInUser) {
        res.render("index");
    } else {
        res.render("welcome");
    }
});

app.get("/index", (req, res) => {
    if (req.cookies.loggedInUser) {
        res.render("index");
    } else {
        res.render("welcome");
    }
});

app.get("/about-us", (req, res) => {
    res.render("about-us");
});

app.get("/contact-us", (req, res) => {
    res.render("contact-us");
});

app.get("/find-dog", (req, res) => {
    res.render("find-dog");
});

app.get("/welcome", (req, res) => {
    res.render("welcome");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/dog-owner", (req, res) => {
    res.render("dog-owner");
});

app.get("/search-results", (req, res) => {
    res.render("search-results");
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

app.get("/mydogs", (req, res) => {
    res.render("mydogs");
});

app.get("/add-dog", (req, res) => {
    res.render("add-dog");
});

app.get("/edit-dog", (req, res) => {
    res.render("edit-dog");
});

app.get("/initDb", createDb.initDb);
app.get("/dropDb", createDb.dropDb);

app.post("/login", crud.login);
app.post("/logout", crud.logout);
app.get("/logout", crud.logout);
app.post("/signUp", crud.signUp);
app.post("/contactUs", crud.contactUs);

app.get("/getDogs", crud.getDogs);
app.get("/getDogById", crud.getDogById);
app.get("/getDogOwnerByDogId", crud.getDogOwnerByDogId);
app.post("/searchDogs", crud.searchDogs);
app.post("/createDog", crud.createDog);
app.put("/updateDog", crud.updateDog);
app.delete("/deleteDog", crud.deleteDog);

app.get("/getProfile", crud.getProfile);
app.put("/updateProfile", crud.updateProfile);

//listening
app.listen(port, () => {
    console.log("server is running on port " + port);
});
