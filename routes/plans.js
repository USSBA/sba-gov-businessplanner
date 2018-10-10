// ROUTE users/:id/plans
var express = require("express")
var router = express.Router({mergeParams: true})

// models
var User = require("../models/user")
var Plan = require("../models/plan")

// middleware
var middleware = require("../middleware")
// specifying only the directory will assume that index.js is used

// ===================
// Plans RESTful Routes
// ===================

// NEW - show form to add new
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Plan.findById(req.params.id, function(err, plan) {
        if (err) {
            console.log(err)
        } else {
            res.render('plans/new', {plan: plan})
        }
    })
})

// add back middleware to check plan ownership eventually
// EDIT PLAN ROUTE
router.get("/:id/edit", function(req, res) {
    Plan.findById(req.params.id, function(err, foundPlan) {
        if (err) {
            console.log(err)
        } else {
            res.render("plans/edit", {plan: foundPlan})
        }

    })
}) 

// SHOW - display a single plan
router.get('/:id', function(req, res) {
    Plan.findById(req.params.id, function (err, foundPlan) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundPlan)
            res.render('plans/show', {plan: foundPlan})
        }
    })
})

// middleware.checkPlanOwnership
// UPDATE PLAN ROUTE
router.put("/:id", function(req, res) {
    // find and update the correct plan
    Plan.findByIdAndUpdate(req.params.id, req.body.plan, function(err, updatedPlan) {
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/plans/" + req.params.id)
        }
    })
})

// DESTROY - delete a plan
router.delete("/:id", function(req, res) {
    Plan.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    })
})

// INDEX - show all plans
router.get('/', function(req, res) {
    // identify user
    console.log(req.user)
    // fetch all plans
    Plan.find({}, function(err, allPlans) {
        if(err) {
            console.log(err)
        } else {
            res.render('plans/index', {plans: allPlans, currentUser: req.user})
        }
    })
})

// CREATE - add new plan to database
router.post('/', middleware.isLoggedIn, function(req, res) {
    // Receiving the form data as req.body.plan
    // Create new object with data pulled from form
    // Painstakingly pulling each piece of data out, so that
    // manipulation at a later date will be easier
    var newPlan = { 
        company_name: req.body.plan.company_name,
        owner_name: req.body.plan.owner_name,
        city: req.body.plan.city,
        state: req.body.plan.state,
        zip_code: req.body.plan.zip_code,
        product_or_service: req.body.plan.product_or_service,
        target_customers: req.body.plan.target_customers,
        goals: req.body.plan.goals,
        mission_statement: req.body.plan.mission_statement,
        principal_members: req.body.plan.principal_members,
        legal_structure: req.body.plan.legal_structure,
        industry_description: req.body.plan.industry_description,
        customers: req.body.plan.customers,
        competitors: req.body.plan.competitors,
        advantages_over_competition: req.body.plan.advantages_over_competition,
        regulations: req.body.plan.regulations,
        company_productservice: req.body.plan.company_productservice,
        pricing_structure: req.body.plan.pricing_structure,
        life_cycle: req.body.plan.life_cycle,
        intellectual_property: req.body.plan.intellectual_property,
        research_and_development: req.body.plan.research_and_development,
        plan_to_grow: req.body.plan.plan_to_grow,
        plan_to_communicate: req.body.plan.plan_to_communicate,
        plan_to_sell: req.body.plan.plan_to_sell,
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
            res.redirect("/plans")
        }    
    })
})

module.exports = router
