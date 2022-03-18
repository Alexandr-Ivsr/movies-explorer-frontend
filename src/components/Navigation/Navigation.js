import React from 'react';
import './Navigation.css';
import ProfileIcon from '../../images/profile-icon.svg';

export default function Navigation(props) {
  return (
    <div className={`navigation ${props.className}`}>
      <div className="navigation__wrapper">
        <div className="navigation__links">
          <a className="navigation__link navigation__link_type_hidden" href="/">Главная</a>
          <a className="navigation__link" href="/movies">Фильмы</a>
          <a className="navigation__link navigation__link_type_custom" href="movies">Сохранённые фильмы</a>
        </div>
        <a className="navigation__profile" href="/profile">
          Аккаунт
          <img className="navigation__profile-icon" src={ProfileIcon} alt="иконка профиля" />
        </a>
      </div>
    </div>
  );
};
