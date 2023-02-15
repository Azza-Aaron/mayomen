export async function editPostOnServer(post, postTitle, postDate, postBody, id){
  console.log(post)
  let postNumber
  for (let i = 0; i < post.length; i++) {
    if (post[i].id === id) {
      postNumber = i
    }
  }
  const update = {
    id: id,
    header: postTitle ? postTitle : post[postNumber].header,
    date: postDate ? postDate : post[postNumber].date,
    body: postBody ? postBody : post[postNumber].body
  }

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(update)
  };
  await fetch(`/api/blogposts`, requestOptions)
    .catch(err => console.log(err))
}