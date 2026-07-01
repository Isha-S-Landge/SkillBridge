import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";

function Navbar() {
    const { user, handleLogout } = useContext(MyContext);

    return (
        <nav className="navbar">
            <Link to="/" className="navbarLogo">
                <span className="logoIcon">◆</span>
                <span>SkillBridge</span>
            </Link>

            <div className="navbarLinks">
                <NavLink to="/" end>
                    Home
                </NavLink>

                <NavLink to="/explore">
                    Browse Skills
                </NavLink>

                <NavLink to="/post-skill">
                    Become a Mentor
                </NavLink>

                <a href="/#how-it-works">
                    How It Works
                </a>

                <a href="/#about-us">
                    About Us
                </a>
            </div>

            <div className="navbarRight">
                {user ? (
                    <>
                        <Link to="/profile" className="profileLink">
                            <div className="userAvatar">
                                {user.charAt(0).toUpperCase()}
                            </div>
                            <span>Hi, {user}</span>
                        </Link>

                        <button onClick={handleLogout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="loginLink">
                            Login
                        </Link>

                        <Link to="/login" className="signupBtn">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;