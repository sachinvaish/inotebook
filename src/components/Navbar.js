import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Logout from './Logout';

const userBar = () => {
    if (localStorage.authToken) {
        return (
            <>
            <div className="mx-2">Hi {localStorage.userName} <Logout/> </div>
            </>
        )
    }
    else {
        return (
            <>
                <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                <Link to="/signup" className="btn btn-primary mx-2">Signup</Link>
            </>
        )
    }
}

export default function Navbar(props) {
    let location = useLocation().pathname;
    return (
        <nav className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{props.logo}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location == "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location == "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>

                    <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                        {userBar()}
                        {/* <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Switch to Dark Mode</label> */}
                    </div>

                </div>
            </div>
        </nav>
    );
}