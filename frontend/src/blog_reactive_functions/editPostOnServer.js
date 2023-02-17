export async function editPostOnServer(details){
  console.log(details)

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  };
  await fetch(`/api/blogposts`, requestOptions)
    .catch(err => console.log(err))
}