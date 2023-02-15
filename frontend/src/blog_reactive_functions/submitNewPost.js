export const submitNewPost = async (fields) => {
  console.log('fields: ', fields);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields)
  };
  await fetch(`/api/blogposts`, requestOptions)
    .catch(err => console.log(err))
}