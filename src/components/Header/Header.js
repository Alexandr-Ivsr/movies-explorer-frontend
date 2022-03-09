import React from 'react';
// import { Link } from "react-router-dom"
import './Header.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Header(props) {
	return (
		<header className={`header ${props.isMainPage ? "header_color_pink" : ""}`}>
			<a className="header__link" href="/">
				<img className="header__link-logo" src={HeaderLogo} alt="Логотип" />
			</a>
			<div className="header__wrapper">
				<a className="header__link-registr" href="/signup">Регистрация</a>
				<a className="header__link-login" href="/signin">Войти</a>
			</div>
		</header>
	)
};