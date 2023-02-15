import React, {useState} from "react";
import moment from "moment";
import {submitNewPost} from "./submitNewPost";

export function AddPost({getPosts}) {
  //use state for form fields
  const theDate = moment().format('D/MM/YYYY')
  const [fields, setFields] = useState({header: '', date: theDate, body: ''});

  const handleSubmit = async () =>  {
    await submitNewPost(fields)
    getPosts();
  }

  console.log(`add post clicked`)
  return(
    <li>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Post Title</label>
        <br/>
        <input type={"text"} id={"new-post-t"} required placeholder={"Enter Title"}

                            onInvalid={e => e.target.setCustomValidity('Enter Blog Title')}
                            onInput={e => e.target.setCustomValidity('')}
                            onBlur={(e) => setFields({...fields, header: e.target.value})}/>
        <br/>
        <label><input type={"text"} id={"new-post-d"}
                      defaultValue={fields.date}
                      onBlur={(e) => setFields({...fields, date: e.target.value})} required/></label>
        <br/>
        <label>Post<textarea className="form-control" id="new-post-b" cols={"20"} rows="16"
                              required placeholder={"Blog Entry"}
                              onInput={e => e.target.setCustomValidity('')}
                             onBlur={(e) => setFields({...fields, body: e.target.value})}
        ></textarea></label>
        <br/>
        <button type="submit" value="Submit" id={"submit-inputs"} className={"btn btn-dark"} onClick={handleSubmit} >Submit</button>
      </form>
    </li>
  )
}

export async function editPost(e) {
  console.log(e.target.id)
  console.log(`edit post clicked`)
}

export async function deletePost(e) {
  console.log(e.target.id)
  console.log(`delete post clicked`)
}