import React from 'react';
import { Link } from "react-router-dom"
import './Register.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Register(props) {
  return (
    <section className="form">
      <div className="form__container">
        <Link className="form__logotype" to="/">
          <img className="form__logotype-image" src={HeaderLogo} alt="логотип" />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form__form">
          <div className="form__inputs-wrapper">
            <label className="form__label-input">
              Имя
              <input required type="text" className="form__input" placeholder="Введите имя" name="name" />
            </label>
            <label className="form__label-input">
              E-mail
              <input required type="email" className="form__input" placeholder="Введите email" name="email" />
            </label>
            <label className="form__label-input">
              Пароль
              <input required type="password" className="form__input form__input_type_error" placeholder="Введите пароль" name="password" />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>
          </div>
          <button className="form__form-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="form__wrapper">
          <span className="form__wrapper-text">Уже зарегистрированы?</span>
          <Link className="form__wrapper-link" to="/signin">Войти</Link>
        </p>
      </div>
    </section>
  )
}