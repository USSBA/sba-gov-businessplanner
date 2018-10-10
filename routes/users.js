// Import required packages
var express = require("express")
var passport = require("passport")

// Initialize an Express Router
var router = express.Router()

// Import Model
var User = require("../models/user")

// Import Middleware
var middleware = require("../middleware")

// ====================
// AUTHORIZATION ROUTES
// ====================

// show register form
router.get("/register", function(req, res) {
    // res.send("Register route!")
    console.log("GET /register route")
    res.render("users/register")
})

// handle new registration
router.post("/new", function(req, res) {
    console.log("POST /users/new route")
    // make new user
    var newUser = new User({ username: req.body.username })
    // register new user in database
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.redirect("/users/register")
        }
        // authenticate this user in session
        passport.authenticate("local")(req, res, function() {
            res.redirect("/")
        })
    })
})

// show login form
router.get("/login", function(req, res) {
    console.log("GET /users/login route")
    res.render("users/login", {currentUser: req.user})
})

// handle login
// pattern is app.post("route", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/users/register"
    }), function(req, res) {
})

// handle logout
router.get("/logout", function(req, res) {
    console.log("GET /users/logout route")
    req.logout()
    res.redirect("/")
})

// show profile of individual user
router.get("/:id", function(req, res) {
    console.log("GET /users/:id/profile route")
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            res.render("users/show", {user: foundUser})
        }
    })
})

// edit profile of individual user
router.get("/:id/edit", function(req, res) {
    console.log("GET /users/:id/edit route hit")
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            res.render("users/edit", { user: foundUser })
        }
    })
})

// /users/:id - accept updates to an individual user
router.put("/:id", function(req, res) {
     console.log("PUT /users/:id route hit")
    // find and update the correct user
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if (err) {
            console.log(err)
            res.redirect("/users/edit")
        } else {
            console.log("User updated!")
            res.redirect("/users/" + req.params.id)
        }
    })
})

module.exports = router