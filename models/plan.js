var mongoose = require("mongoose")

var planSchema = new mongoose.Schema({
    company_name: String,
    owner_name: String,
    city: String,
    state: String,
    zip_code: Number,
    product_or_service: String,
    target_customers: String,
    goals: String,
    mission_statement: String,
    principal_members: String,
    legal_structure: String,
    industry_description: String,
    customers: String,
    competitors: String,
    advantages_over_competition: String,
    regulations: String,
    company_productservice: String,
    pricing_structure: String,
    life_cycle: String,
    intellectual_property: String,
    research_and_development: String,
    plan_to_grow: String,
    plan_to_communicate: String,
    plan_to_sell: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

var Plan = mongoose.model("Plan", planSchema)

module.exports = Plan