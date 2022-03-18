import React, { useState } from 'react';
// import { Link } from "react-router-dom"
import './Header.css';
import HeaderLogo from '../../images/logo-header.svg';
import BurgerMenu from '../../images/burger-menu-header.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [isNavigate, setIsNavigate] = useState(false);

  return (
    <header className={`header ${props.isMainPage ? "header_color_pink" : ""}`}>
      <a className="header__link" href="/">
        <img className="header__link-logo" src={HeaderLogo} alt="Логотип" />
      </a>
      {isAuth ? (
        <>
          <button className="header__button-menu" onClick={() => setIsNavigate(true)}>
            <img className="header__button-menu-image" src={BurgerMenu} alt="иконка" />
          </button>
          <Navigation className={`header__navigate ${isNavigate ? "header__navigate_active" : ""}`} />
        </>
      ) : (
        <div className="header__wrapper">
          <a className="header__link-registr" href="/signup">Регистрация</a>
          <a className="header__link-login" href="/signin">Войти</a>
        </div>
      )}
    </header>
  )
};