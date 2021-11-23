import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import logo from '../../logo/icon-left-font-monochrome-white.png';
import ReactTooltip from 'react-tooltip';


const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const token = localStorage.getItem("token");
    const userData = useSelector((state) => state.userReducer);

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location = "/";
    }

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }

    return (
        <header className={!token ? "headerLogin" : null}>
            <NavLink exact to={token ? '/post' : '/'}>
                <div className="header-container-img">
                    <img src={logo}
                        alt="logo de l'entreprise groupomania"
                        className="header-img-groupomania" />
                </div>
            </NavLink>

            {
                token ? (
                    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
                        <ul className="nav-links">
                            <li>
                                <NavLink aria-label="Accueil" onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/post'>
                                    <p>Accueil</p>
                                    <i className="fas fa-home" data-tip="Accueil"></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/profil'>
                                    <p>Profil</p>
                                    <i className="fas fa-user" data-tip="Profil"></i>
                                </NavLink>
                            </li>
                            <li >
                                <NavLink aria-label="Notification" onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/' >
                                    <p>Notifications</p>
                                    <i className="fas fa-bell" data-tip="Notifications"></i>
                                </NavLink>
                            </li>
                            {userData.isAdmin &&
                                <li>
                                    <NavLink aria-label="Tout les utilisateurs" onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/users'>
                                        <p>Tout les utilisateurs</p>
                                        <i className="fas fa-users" data-tip="Tout les utilisateurs"></i>
                                    </NavLink>
                                </li>
                            }
                            <li >
                                <p tabIndex="0" type="button" aria-label="Déconnexion" onClick={Logout}>Déconnexion</p>
                                <i tabIndex="0" aria-label="Déconnexion" onClick={Logout} className="fas fa-power-off" data-tip="Déconnexion"></i>
                            </li>
                            <ReactTooltip
                                place="bottom"
                                type="info"
                                effect="solid"
                            />
                        </ul>
                        <button className="navbar-burger mobile" onClick={handleShowLinks}>
                            <span className="burger-bar"></span>
                        </button>
                    </nav>
                ) : (
                    <NavLink exact={true} to='/'></NavLink>
                )
            }
        </header >
    )
};

export default Navbar;
