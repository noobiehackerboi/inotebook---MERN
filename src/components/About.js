const About = () => {
  return (
    <>
      <div className="text-center" style={{ fontSize: "2rem" }}>
        <p style={{ fontSize: "3rem" }}>About</p>
        <p>This project is created by Divya Ratna.</p>
        <a className="text-decoration-none" href="https://github.com/noobiehackerboi/inotebook---MERN" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github mx-3"></i>
          GitHub Link For this Repo
        </a>
      </div>
      <footer className="text-center" style={{ paddingTop: "100px", fontSize: "2rem" }}>
        <div className="container">
          Developer Info : &nbsp;&nbsp;
          <a className="mx-2" href="https://github.com/noobiehackerboi" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a className="mx-2" href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a className="mx-2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a className="mx-2" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-facebook"></i>
          </a>
        </div>
      </footer>
    </>
  )
}

export default About
