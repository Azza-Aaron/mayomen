const express = require('express');
const router = express.Router();
const {getBlogPosts, createBlogPost, editBlogPosts, postDelete} = require('../../db/blog')

let posts = []

// route for getting all posts
router.get('/', async (req,res) => {
  try {
    console.log('here')
    posts = await getBlogPosts()
    res.json({posts: posts})
  } catch (e) {
    console.log(e)
    res.status(400)
  }
})

// api/blogposts/:id <- get one id
router.get('/:id', (req,res) => {
  const id = req.params.id; // api/blogposts/1
  //res.send({posts: post})
})

router.post('/', async (req, res) => {
  console.log('making new post')
  const newPost = [
    req.body.header, //SQL injection
    req.body.date,
    req.body.body,
  ];
  try {
    const result = await createBlogPost(newPost)
    res.json({msg: 'ok', id: result.id})
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(400)
  }
})


// route for updating a post

router.patch('/', async(req,res) => {
  try {
    console.log('updating post')
    const newPost = [
      req.body.header,
      req.body.date,
      req.body.body,
    ];
    await editBlogPosts(newPost)
    res.status(200);
    res.send('post updated')
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
});


router.delete('/', async (req,res) => {
  try {
    await postDelete(req.body.id)
    res.send('post deleted')
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
});

module.exports = router