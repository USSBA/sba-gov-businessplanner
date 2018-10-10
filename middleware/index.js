
// models
var Plan = require("../models/plan")
var User = require("../models/user")

// all the middleware goes here
var middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    //req.flash("error", "You need to be logged in to do that")
    res.redirect("/users/login")
}

middlewareObj.checkPlanOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Plan.findById(req.params.id, function(err, foundPlan) {
            if (err) {
                // req.flash("error", "We could not find the business plan requested")
                res.redirect("/plans")
            } else {
                // does user own this business plan?
                if(foundPlan.author.id.equals(req.user._id)) {
                    next()
                } else {
                    // req.flash("error", "You need to be the author of this business plan to do that")
                    res.redirect("back")
                }
            }
        })
    } else {
        // req.flash("error", "You need to be logged in to do that")
        res.redirect("back")
    }
}

module.exports = middlewareObj