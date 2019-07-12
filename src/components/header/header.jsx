import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './header.css';

const Header = () => {

    return (
        <header className="header bg-dark">
            <div className="container justify-content-between header__container">
                <Link to="/">
                    <img src={logo} alt="Logo" className="header__logo" />
                </Link>
                <p className="h3 text-light header__forecast">React test task</p>
            </div>
        </header>
    )
};

export default Header;