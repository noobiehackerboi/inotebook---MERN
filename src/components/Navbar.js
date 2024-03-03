import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    let navigator = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        props.showAlert("Logout Successful", "success");
        navigator("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {localStorage.getItem('auth-token') ?
                        <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
                        :
                        <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">Sign Up</Link>
                        </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
