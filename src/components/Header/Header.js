import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Header.css';
import HeaderLogo from '../../images/logo-header.svg';
import BurgerMenu from '../../images/burger-menu-header.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const [isNavigate, setIsNavigate] = useState(false);

  return (
    <header className={`header ${props.isMainPage ? "header_color_pink" : ""}`}>
      <Link className="header__link" to="/">
        <img className="header__link-logo" src={HeaderLogo} alt="Логотип" />
      </Link>
      {props.LoggedIn ? (
        <>
          <button className="header__button-menu" onClick={() => setIsNavigate(true)}>
            <img className="header__button-menu-image" src={BurgerMenu} alt="иконка" />
          </button>
          <Navigation setIsNavigate={setIsNavigate} className={`header__navigate ${isNavigate ? "header__navigate_active" : ""}`} />
        </>
      ) : (
        <div className="header__wrapper">
          <Link className="header__link-registr" to="/signup">Регистрация</Link>
          <Link className="header__link-login" to="/signin">Войти</Link>
        </div>
      )}
    </header>
  )
};