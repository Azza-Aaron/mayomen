function MainNavbar() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <a className="navbar-brand" href="/" style={{marginLeft: "50px"}}>MayoMen</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/checkmayo">Mayo Check!</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/About">Define Mayo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/blog">MayoMates Blog</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/MakeMayo">Make My Mayo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/loginpage">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export {MainNavbar};
