import React from "react";
import Modal from "react-bootstrap/Modal"
import {editPostFromServer} from "./addEditDelete";
import {editPostOnServer} from "./editPostOnServer";

export function EditModal({post, id, getPosts, setShowModal, setPost}) {
  let singlePost = post.find(p => p.id === id);

  console.log({singlePost})

  const [details, setDetails] = React.useState({ //...singlePost
          header: singlePost.header,
          date: singlePost.date,
          body: singlePost.body
        }
      );

  /*let postTitle;
  let postDate;
  let postBody;*/

  const handleEdit = async () => {
    //equality check
    /*if(!postTitle && !postDate && !postBody) {
      setIsOpen(false);
      return;
    }*/
    const send = await editPostOnServer({...singlePost, ...details })
    console.log({details})
    setShowModal(false);
    setIsOpen(false)

    let newList = []
    newList = post.filter((p) => p.id !== id);
    newList.push(details)
    console.log('new list log in edit/update' ,newList)
    setPost(newList)
    console.log('post after set post', post)
  }

  //// MODAL SHINANIGANS
  const [isOpen, setIsOpen] = React.useState(true)
  //{post[postNumber].body}
  return (
    <Modal show={isOpen}>
      {isOpen ? <>
          <Modal.Header>
            <h3 contentEditable onBlur={(e) => setDetails({...details, header: e.target.innerText})}>{details.header}</h3>
          </Modal.Header>

          <Modal.Body>
            <p contentEditable onBlur={(e) => setDetails({...details, date: e.target.innerText})}>{details.date}</p>
          <br/>
            <div
              className="input"
              role="textbox"
              contentEditable
              onBlur={(e) => setDetails({...details, body: e.target.innerText})}>
              {details.body}
              </div>

          </Modal.Body>
      </> : null
      }
      <Modal.Footer>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <button className={"btn btn-dark"} onClick={() => {
          setIsOpen(false)
        }}>Cancel</button>
          <button className={"btn btn-dark"} onClick={handleEdit}>Submit Changes</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}