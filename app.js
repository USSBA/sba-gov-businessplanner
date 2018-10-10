// Import required packages
var express = require("express")
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var passport        = require("passport")
var localStrategy   = require("passport-local")

// Import models
var Plan = require("./models/plan")
var User = require("./models/user")

// Import routes
var planRoutes = require("./routes/plans")
var userRoutes = require("./routes/users")
var questionnaireRoutes = require("./routes/questionnaires")

// Initialize the Express Application
var app = express()

// Configure the Express Application
// use ejs for simple frontend
app.set('view engine', 'ejs')
// serve up static content from /public directory
app.use(express.static(__dirname + '/public'));
// use body parser package
app.use(bodyParser.urlencoded({extended: true}))
// use method override by appending _method to POST
app.use(methodOverride("_method"))

// Configure Sessions for Express
// use express session, but make sure you store session secret in environment variable for production
app.use(require("express-session")({
    // secret: process.env.SESSIONSECRET
    // Local development
    secret: "This is a test secret only to be used in development",
    resave: false,
    saveUninitialized: false
}))

// Configure Authentication for Express
// use passport, storing credentials locally
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Setup Database/Dependency and Connect
// use mongoose as object-data-mapper
var mongoose = require("mongoose")
// connect to the database, but make sure you store IP/PORT in environment variable for production
// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/biz_planner', { useNewUrlParser: true }) // local development only

// Seed the Database with Test Data
// WARNING -- THIS WILL DESTROY ALL DATA, ONLY USE IN DEVELOPMENT
// var SeedDB = require("./seeder")
// SeedDB()

// Key Middleware to pass the currentUser on every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

// Root route (index)
app.get("/", function(req, res) {
    res.render("index")
})

// Use other routes and pass that the index in <route.js> is now /plans /users
app.use("/users", userRoutes)
// Add after id has been nested
//app.use("/users/:id/plans", planRoutes)
app.use("/plans", planRoutes)
app.use("/questionnaire", questionnaireRoutes)

// Start the Server
app.listen(process.env.PORT, process.env.IP, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Business Planner started on " + process.env.IP + ":" + process.env.PORT)
    }
})