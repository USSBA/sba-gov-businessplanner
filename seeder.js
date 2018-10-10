var mongoose = require("mongoose")
var Plan = require("./models/plan")

var plan_data = [
    {
        company_name: "Raspberry Web Services Inc.",
        owner_name: "Hyan 'The Big Berry' Rillard",
        city: "Des Moines",
        state: "Iowa",
        zip_code: 50047,
        product_or_service: "We will build a distributed network of Raspberry Pis and sell serverless computation power in the form of Function-as-a-Service",
        target_customers: "New developers that are learning Serverless technologies",
        goals: "To educate underserved developers in an up-and-coming technology",
        mission_statement: "Bring Serverless to the Underserved",
        principal_members: "Hyan Rillard, Rill Bollins, King Jon, Lrian Be",
        legal_structure: "501(c)3",
        industry_description: "Technology education non-profit",
        customers: "Developers who are afraid of serverless",
        competitors: "Amazon Web Services, Microsoft Azure, Google Cloud Compute",
        advantages_over_competition: "We are tiny, agile and therefore nimble, and of course, we are ferocious.",
        regulations: "FCC",
        company_productservice: "Serverless Computation at sugarfree prices",
        pricing_structure: "$1.00/month/1,000,000 calls after free 1 month trial of unlimited calls",
        life_cycle: "In Development",
        intellectual_property: "None, we depend on open source technology",
        research_and_development: "We have done extensive research into how to run Node.js on ARM",
        plan_to_grow: "Build and deploy new data centers in California, Texas, and Washington D.C.",
        plan_to_communicate: "Post a lot on Reddit",
        plan_to_sell: "Freemuim offering brings new developers in the door"
    }
]

function seedDB(){
    Plan.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed plans!")
            plan_data.forEach(function(seed){
                Plan.create(seed, function(err, plan) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("PLAN: added new : " + plan.company_name)
                        plan.save()
                    }
                })
            })
        }
    })    
}
 
module.exports = seedDB;