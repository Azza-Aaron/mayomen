const express = require('express');
const router = express.Router();

let post = [{
  header: "YAY MAYO",
  date: "10/01/2023",
  body: "Of all the foods out there, mayonnaise is definitely one of the most divisive. \n" +
    "\n" +
    "Some hate it so much they can hardly stand the sight of this condiment, others would happily slather it on top of everything they eat.\n" +
    "\n" +
    "No matter what side of the line you stand on, there's no denying that mayonnaise is a big part of our food world and so it's only wise to know a thing or two about it -- or nine. \n" +
    "\n" +
    "Without further ado, a quick education on the white, jiggly stuff that makes BLTs the sandwich we adore. But first, this: Barack Obama hates mayonnaise. And he is not alone.",
  image: "../../images/obama.jpg",
  id: "0"
},
  {
    header: "WOHO MAYO",
    date: "10/02/2023",
    body: "faithful mayo words",
    image: "a warm cup of mayo",
    id: "1"
  }]


// // BLOG PAGE
// router.get('/api/blogposts', (req, res) => {
//   res.json({"posts": post})
// })

// route for getting all users
router.get('/', (req,res) => {
  res.json({"posts": post})
})

router.post("/", (req, res, next) => {
  try {
    console.log(req.body)
    const newPost = {
      header: req.body.header,
      date: req.body.date,
      body: req.body.body,
      image: "not yet",
      id: "3 or more"
    }
    post.push(newPost)
    console.log(`${req.body} pushed on server`)
    res.json(req.body)
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({ err: "something went wrong" });
  }
});

// route for getting one user
router.get('/:id', (req,res) => {
  res.send(req.params.id)
})
// route for creating a user
router.post('/', (req,res) => {

})
// route for updating a user
router.patch('/:id', (req,res) => {

})
// route for deleting a user
router.delete('/:id', (req,res) => {

})

module.exports = router