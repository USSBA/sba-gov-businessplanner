// ROUTE users/:id/plans
var express = require("express")
var router = express.Router({mergeParams: true})

// models
var User = require("../models/user")
var Plan = require("../models/plan")

// middleware
var middleware = require("../middleware")
// specifying only the directory will assume that index.js is used


// /questionnaire routes
// This route assumes that no Business Plan exists yet
router.get('/', middleware.isLoggedIn, function(req, res) {
    res.render('questionnaire/introduction')
})

router.post('/', middleware.isLoggedIn, function(req, res) {
    var newPlan = { 
        company_name: req.body.plan.company_name,
        owner_name: req.body.plan.owner_name,
        city: req.body.plan.city,
        state: req.body.plan.state,
        zip_code: req.body.plan.zip_code,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }

    // Create a new plan and save to DB
    Plan.create(newPlan, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/questionnaire/" + newlyCreated._id + "/1")
        }    
    })
})

// /questionnaire/:id/:step routes
// This route assumes that a business plan was created and starts with steps 1, going through 6, after 6, it directs to review
router.get('/:id/:step', function(req, res) {
    console.log("GET on questionnaire id : " + req.params.id + " and step : " + req.params.step)
    // Plan.findById(req.params.id, function(err, foundPlan) {
    Plan.findById(req.params.id, function (err, foundPlan) {
        if (err) {
            console.log(err)
        } else {
            if (req.params.step > 6) {
                res.render("questionnaire/review", {plan: foundPlan})
            } else {
            console.log(foundPlan)
            res.render('questionnaire/' + req.params.step, {plan: foundPlan})
            }
        }
    })
})

router.put('/:id/:step', function(req, res) {
    console.log("PUT on questionnaire id : " + req.params.id + " and step : " + req.params.step)
    Plan.findByIdAndUpdate(req.params.id, req.body.plan, function(err, foundPlan) {
        if (err) {
            console.log("ERR: Could not find a valid plan!")
            console.log(err)
        } else {
            console.log("Found the plan!")
            console.log(foundPlan)
            res.redirect("/questionnaire/" + req.params.id + "/" + req.params.step)
        }
    })
})

module.exports = router