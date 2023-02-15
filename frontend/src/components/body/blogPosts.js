import React, {useEffect, useState} from "react";
import {AddPost, editPost, deletePost, deletePostFromServer} from "../../blog_reactive_functions/addEditDelete";
// import {newEntry} from "../../blog_reactive_functions/submitNewPost";
import {EditModal} from "../../blog_reactive_functions/modal";

function BlogBody() {
  const [post, setPost] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [idForEdit, setIdForEdit] = useState('')
  const getPosts = async () => {
    setPost([])
    const get = await fetch(`/api/blogposts`)
    const post = await get.json()
    if(post?.posts?.length){
      const postValues = Object.values(post.posts)
      setPost(postValues)
      setShowInput(false)
    }
  }

  const deletePost = (id) => {
    deletePostFromServer(id)
    const newList = post.filter((post) => post.id !==id);
    setPost(newList)
  }


  const editPost = (id) => {
    setIdForEdit(id)
    setShowModal(!showModal)
    //editPostFromServer(id)
  }

  useEffect( () => {
    let ignore = false;
    const runOnce = () => {
      if(!ignore){
        getPosts()
      }
    }
    runOnce()
    return () => {
      ignore = true;
    }
  },[])

  if(!post) {
    return (<h1>loading....</h1>)
  }

  const postElements = post.map((post) => {
    return(
      <li className="text-center PaleMayo p-3" key={post.id} id={post.id}>
        <h2 >{post.header}</h2>
        <p >{post.date}</p>
        <h4 >{post.body}</h4>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button id={post.id} className={"btn btn-dark"}
                onClick={() => editPost(post.id)}>Edit</button>
        <button id={post.id} className={"btn btn-dark"}
                onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      </li>
    )
  })

  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
          {
            showInput ? <ul className={"list-unstyled"}> <AddPost getPosts={getPosts}/> </ul> : null
          }
        </div>
        <div className="col-9 align-self-center mt-3">
          <h1>My Blog</h1>
          {
            showModal ? <EditModal post ={post} id ={idForEdit} getPosts ={getPosts}/> : null
          }
          <button className={"btn btn-dark"} onClick={() => {
            setShowInput(!showInput)
          }}>Add Post</button>
          <ul className={"list-unstyled"}> { postElements } </ul>
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}


export {
  BlogBody
}