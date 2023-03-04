const {dbClient} = require('./index.js')

const client = dbClient;

const getBlogPosts = async () => {
  const result = await client.query('SELECT * FROM public.blog_posts')
  return result.rows.map((post) => {
    console.log(post)
    return {
      id: post.id,
      header: post.header,
      date: post.date,
      body: post.body}
  })
}

const postPreppedQuery = (newPost) => {
  return {
    //name: 'insert-new-post',
    text: `INSERT INTO public.blog_posts (header, date, body)
                VALUES ($1, $2, $3)
                RETURNING id`,
    values: newPost
  };
};const createBlogPost = async (newPost) => {
  const sendPost = postPreppedQuery(newPost)
  const dbRes = await client.query(sendPost)//.then((res) => res[0].id);
  const row = dbRes.rows[0];
  console.log(row.id);
  return row
}

const editPreppedQuery = (newPost) => {
  return {
    //name: 'update-post',
    text: `UPDATE public.blog_posts 
    SET header=$1,  date=$2, body=$3
    WHERE id=$4`,
    values: newPost
  };
};
const editBlogPosts = async (newPost) => {
  client.query(editPreppedQuery(newPost))
}

const postDelete = async (id) => {
  await client.query(
    {
      text: `DELETE FROM public.blog_posts WHERE id = $1`,
      values: [id],
    }
  )
}

module.exports = {
  getBlogPosts,
  createBlogPost,
  editBlogPosts,
  postDelete
}