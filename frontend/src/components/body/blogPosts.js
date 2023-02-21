import React, {useEffect, useState} from "react";
import {AddPost, editPost, deletePost, deletePostFromServer} from "../../blog_reactive_functions/addEditDelete";
// import {newEntry} from "../../blog_reactive_functions/submitNewPost";
import {EditModal} from "../../blog_reactive_functions/modal";

let retry = 1

function BlogBody() {
  const [post, setPost] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [idForEdit, setIdForEdit] = useState('')
  const getPosts = async () => {
  //setPost([])
  try {
    const get = await fetch(`/api/blogposts`)
    const post = await get.json()
    if(post?.posts?.length){
      const postValues = Object.values(post.posts)
      console.log({postValues})
      setPost(postValues)
      setShowInput(false)
      retry = 1
    } else {
      console.log('retry')
      if(retry < 500){
        retry += 1
        getPosts()
      } else {
        console.log('failed')
      }
    }
  } catch {
    if(retry < 500){
      retry += 1
      getPosts()
    } else {
      console.log('failed')
    }
  }
  }



  const deletePost = (id) => {
    deletePostFromServer(id)
    const newList = post.filter((p) => p.id !== id);
    console.log({newList, post})
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
        <div className={"card text-white bg-dark mb-3 PaleMayo p-3"}>
          <div className={"card-header PaleMayo p-3 darker"}>
            <h2>{post.header}</h2>
            <p >{post.date}</p>
          </div>
          <div className={"card-body PaleMayo p-3 darker"}>
            <h4 >{post.body}</h4>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <button id={post.id} className={"btn btn-dark PaleMayo p-3 darker"}
                      onClick={() => editPost(post.id)}>Edit</button>
              <button id={post.id} className={"btn btn-dark PaleMayo p-3 darker"}
                      onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
          {
            showInput ? <ul className={"list-unstyled"} key={"inputs-ul"}> <AddPost setShowInput={setShowInput} setPost={setPost} post={post}/> </ul> : null
          }
        </div>
        <div className="col-9 align-self-center mt-3">
          <h1>Regale me with Mayo</h1>
          {
            showModal ? <EditModal post={post} id={idForEdit} getPosts={getPosts} setShowModal={setShowModal} setPost={setPost}/> : null
          }
          <button className={"btn btn-dark"} onClick={() => {
            setShowInput(!showInput)
          }}>Add Post</button>
          <ul className={"list-unstyled"} key={'post-elements'}> { postElements } </ul>
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