export const submitNewPost = async (fields) => {
  //console.log('fields: ', fields);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields)
  };
  const response = await fetch(`/api/blogposts`, requestOptions)
    .catch(err => console.log(err))
  const data = await response.json()
  //console.log('id to use is ',data.id)
  return data.id
}