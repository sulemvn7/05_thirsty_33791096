// Create a new router
const express = require("express");
const router = express.Router();

var shopData = {shopName: "The Thirsty Student", 
                productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"],
                shops: [
    {
      name: "The Plum Tree",
      manager: "Esther Morrish",
      address: "154 Plumstead Common Rd, London SE18 2UL, United Kingdom"
    },
    {
      name: "Amathus Soho Drinks",
      manager: "Alexios Stasinopoulos",
      address: "113-117 Wardour St, London W1F 0UN "
    },
    {
      name: "Ghost Whale",
      manager: "Emma Swann",
      address: "70 Atlantic Rd, London SW9 8PX"
    }
  ]
              }


// Handle the main routes
router.get("/", function(req, res) {
  res.render("index.ejs", shopData);
});

//About page route
router.get("/about", function(req, res)  {
    res.render("about.ejs", shopData)
}); 

// Search page route
router.get("/search", function(req, res)  {
  res.render("search.ejs", shopData);
});

// Search results route - handle GET request from the form
router.get('/search_result', function (req, res) {
    const name = req.query.Name;        // get the value from the Name input
    const category = req.query.Category; // get the value from the Category input

    // Send a response using the extracted values
    res.send("You searched for " + name + " in " + category);
 });

 //Register form routes
 router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
router.post("/registered", (req,res) => { 

    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;

    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        // Invalid email
        return res.send('Please enter a valid email address!');
    }


  res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! We will send an email to you at ' + req.body.email + '.');   
}); 

//Task 11 Extension - Survey Form

// Survey page route
router.get("/survey", function (req, res) {
  res.render("survey.ejs", shopData);
});

// Handle survey form submission (POST)
router.post("/survey_result", (req, res) => {
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const age = req.body.age;
  const category = req.body.category;
  const student = req.body.student ? "Yes" : "No";

  //Server-side validation (backup in case JS is bypassed)
  if (!first || !last || !email || !age || !category) {
    return res.send("Please fill in all required fields correctly.");
  }

  res.render("survey_results.ejs", {
    shopName: shopData.shopName,
    first,
    last,
    email,
    age,
    category,
    student
  });
});



// Export the router object so index.js can access it
module.exports = router;

