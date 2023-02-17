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

// route for getting all users
router.get('/', (req,res) => {
  res.json({posts: post})
})

// api/blogposts/:id <- get one id
router.get('/:id', (req,res) => {
  const id = req.params.id; // api/blogposts/1
  //res.json({posts: post})
})

router.post('/', (req, res) => {
  try {
    const newPost = {
      header: req.body.header, //SQL injection
      date: req.body.date,
      body: req.body.body,
      image: "not yet",
      id: post.length + 1 //incrementing number
    }
    post.push(newPost)
    console.log(`${req.body} pushed on server`)
    res.status(201);
    res.json({id: newPost.id})
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({ err: "something went wrong" });
  }
});

// route for updating a user
router.patch('/', (req,res) => {
  try {
    console.log({post, body: req.body})
    let postIndex = post.findIndex(aPost => aPost.id === req.body.id);

    if(postIndex < 0) {
      res.status(400);
      res.json({msg: 'something went wrong'});
      return;
    }

    const {header, id, date, body} = req.body;
    post[postIndex] = {header, id, date, body};

    res.status(200);
    res.send('post updated')
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
});

// route for deleting a user
router.delete('/', (req,res) => {
  try {
    console.log({body: req.body, post})
    const index = post.findIndex(aPost => aPost.id === req.body.id);

    if(index < 0) {
      res.status(400);
      res.json({msg: 'no'});
    }

    //post.splice(index, 1); technically correct, but not often used
    post = post.filter(aPost => aPost.id !== req.body.id);

    res.send('post deleted')
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
});

module.exports = router