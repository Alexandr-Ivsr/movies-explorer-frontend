import React from 'react';
import { Link } from "react-router-dom"
import './Navigation.css';
import ProfileIcon from '../../images/profile-icon.svg';
import ButtonClose from '../../images/button-close.svg'

export default function Navigation(props) {
  return (
    <div className={`navigation ${props.className}`}>
      <div className="navigation__wrapper">
        <div className="navigation__links">
          <Link className="navigation__link navigation__link_type_hidden" to="/">Главная</Link>
          <Link className="navigation__link" to="/movies">Фильмы</Link>
          <Link className="navigation__link navigation__link_type_custom" to="/saved-movies">Сохранённые фильмы</Link>
        </div>
        <Link className="navigation__profile" to="/profile">
          Аккаунт
          <img className="navigation__profile-icon" src={ProfileIcon} alt="иконка профиля" />
        </Link>
        <button className="navigation__button-close" onClick={() => props.setIsNavigate(false)}>
          <img className="navigation__button-close-icon" src={ButtonClose} alt="иконка закрытия" />
        </button>
      </div>
    </div>
  );
};
