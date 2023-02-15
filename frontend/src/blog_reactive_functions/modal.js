import React from "react";
import Modal from "react-bootstrap/Modal"
import {editPostFromServer} from "./addEditDelete";
import {editPostOnServer} from "./editPostOnServer";

export function EditModal({post, id, getPosts}) {
  let postNumber
  for (let i = 0; i < post.length; i++) {
    if (post[i].id === id) {
      postNumber = i
    }
  }

  let postTitle
  let postDate
  let postBody

  const handleEdit = async (post, postTitle, postDate, postBody, id) => {
    if(!postTitle && !postDate && !postBody) {
      setIsOpen(false);
      return;
    }
    const send = await editPostOnServer(post, postTitle, postDate, postBody, id)
    console.log(send)
    getPosts()
    setIsOpen(false)
  }

  //// MODAL SHINANIGANS
  const [isOpen, setIsOpen] = React.useState(true)
  //{post[postNumber].body}
  return (
    <Modal show={isOpen}>
      {isOpen ? <>
          <Modal.Header>
            <h3 contentEditable onBlur={(e) => postTitle = e.target.innerText}>{post[postNumber].header}</h3>
          </Modal.Header>

          <Modal.Body>
            <p contentEditable onBlur={(e) => postDate = e.target.innerText}>{post[postNumber].date}</p>
          <br/>
            <div
              className="input"
              role="textbox"
              contentEditable
              onBlur={(e) => postBody = e.target.innerText}>
              {post[postNumber].body}
              </div>

          </Modal.Body>
      </> : null
      }
      <Modal.Footer>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <button className={"btn btn-dark"} onClick={() => {
          setIsOpen(false)
        }}>Cancel</button>
          <button className={"btn btn-dark"} onClick={() => handleEdit(post, postTitle, postDate, postBody, id)}>Submit Changes</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}