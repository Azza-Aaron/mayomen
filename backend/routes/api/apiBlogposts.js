const express = require('express');
const router = express.Router();

const {Client} = require("pg")

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
})

client.connect();


let posts = []

// route for getting all users
router.get('/', async (req,res) => {
  const get = await client.query('SELECT * FROM public.blog_posts', async (err, res) => {
    if(!err){
      posts = []
      res.rows.map((post) => {
        posts.push({
          id: post.id,
          header: post.header,
          date: post.date,
          body: post.body
        })
      })
      //console.log(res.rows)
      return res.rows
    } else {
      console.log(err.message)
    }
    client.end
  })
  // console.log('deconstruct header', posts)
  // console.log('rows sent')
  res.send({posts: posts})
})

// api/blogposts/:id <- get one id
router.get('/:id', (req,res) => {
  const id = req.params.id; // api/blogposts/1
  //res.send({posts: post})
})


const postPreppedQuery = (newPost) => {
  return {
    name: 'insert-new-post',
    text: `INSERT INTO public.blog_posts (header, date, body)
                VALUES ($1, $2, $3)
                RETURNING id`,
    values: newPost
  };
};
router.post('/', async (req, res) => {
  console.log('making new post')
  const newPost = [
    req.body.header, //SQL injection
    req.body.date,
    req.body.body,
  ];
  const sendPost = postPreppedQuery(newPost)
  const dbRes = await client.query(sendPost)//.then((res) => res[0].id);
  const rowId = dbRes.rows[0];
  console.log(rowId.id);

  res.status(200)
  res.json({msg: 'ok', id: rowId.id})
})

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
router.delete('/', async (req,res) => {
  try {
    const reqId = req.body.id
    const tryDelete = await client.query(
      `DELETE FROM public.blog_posts WHERE id = ${reqId}`)
    //console.log({body: req.body, post})
    //const index = post.findIndex(aPost => aPost.id === req.body.id);

    //post.splice(index, 1); technically correct, but not often used
    // post = post.filter(aPost => aPost.id !== req.body.id);

    res.send('post deleted')
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
});

module.exports = router