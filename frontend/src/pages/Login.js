import React, {useEffect, useState} from 'react'
import CookieConsent, { Cookies } from "react-cookie-consent";

export const checkIfLoggedIn = async () => {
  console.log('init check id')
  const checkAuthentication = await fetch(`/api/users/authenticated`)
  const authResult = await checkAuthentication.json()
  console.log(authResult.key)
  if(authResult.key === true){
    console.log('i should be logged in')
    return true
  }else{
    console.log('i havent logged in yet? oof')
    return false
  }
}


export function LoginPage () {
  let authenticated = false
  const [loggedIn, setLoggedIn] = useState(authenticated)
  useEffect(() => {
    let ignore = false;
    const runOnce = async () => {
      if(!ignore){
        const authenticated = await checkIfLoggedIn()
        setLoggedIn(authenticated)
      }
    }
    runOnce()
    return () => {
      ignore = true;
    }
  },[])
  const [inputUser, setInputUser] = useState("")
  const [inputPass, setInputPass] = useState("")

  const submitDetails = async () => {
    //console.log(inputUser, inputPass)
    const userInfo = {
      user: inputUser,
      password: inputPass
    }
    const authRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };

    try {
      const login = await fetch(`/api/users/login`, authRequest)
      console.log (login.json())
    } catch (e) {
      console.log(e)
    }
    const authenticated = await checkIfLoggedIn()
    if(authenticated){
      setLoggedIn(true)
    }
  }

  const logout = async () => {
    console.log('logging out')
    const deleteConnection = await fetch(`/api/users/logout`)
    //const response = await deleteConnection.json()
    console.log(deleteConnection.status)
    if(deleteConnection.status === 200) {
      setLoggedIn(false)
    }else {
      console.log('error logging out')
    }
  }

  if(loggedIn === false){
    return(
      <div className="PaleMayo">
        <div className="row">
          <div className="col align-self-start">
          </div>
          <div className="col-9 align-self-center mt-3">
            <h1>Login</h1>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Username" onBlur={(e) => {
                  const inputUser = e.target.value;
                  setInputUser(inputUser)
                }} required={true}/>
                <small id="userHelp" className="form-text text-muted">We'll never share your information with anyone
                  else... Probably.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                       placeholder="Password" onBlur={(e) => {
                  const inputPass = e.target.value;
                  setInputPass(inputPass)
                }} required={true}/>
                <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
              </div>
              <button type="submit" className="btn btn-primary" onClick={() => {if(inputUser && inputPass){submitDetails()}}}>Submit</button>
            </form>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    )
  }


  return(
    <div className="PaleMayo">
      <div className="row">
        <div className="col align-self-start">
        </div>
        <div className="col-9 align-self-center mt-3">
          <h1>Welcome Mayoman</h1>
          <br/>
          <a className="nav-link" href="/blog"><button className={"btn btn-primary"}>Edit Blog Sir? Click me you devil!</button></a>
          <br/>
          <button className={"btn btn-secondary"} onClick={() => logout()}>Logout</button>
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}