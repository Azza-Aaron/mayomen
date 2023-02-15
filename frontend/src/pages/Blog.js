import {BlogBody} from "../components/body/blogPosts";


function Blog(){
  return(
    <>
      <div className={"PaleMayo"}>
        <div id={"header"}>
          <BlogBody />
        </div>
      </div>
    </>
  )
}

export {Blog}