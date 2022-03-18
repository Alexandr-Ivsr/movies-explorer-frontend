import React from 'react';
import './Login.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Login(props) {
  return (
    <section className="form">
      <div className="form__container">
        <a className="form__logotype" href="/">
          <img className="form__logotype-image" src={HeaderLogo} alt="логотип" />
        </a>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__form">
          <div className="form__inputs-wrapper form__inputs-wrapper_type_login">
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
          <button className="form__form-button" type="submit">Войти</button>
        </form>
        <p className="form__wrapper">
          <span className="form__wrapper-text">Ещё не зарегистрированы?</span>
          <a className="form__wrapper-link" href="/signin">Регистрация</a>
        </p>
      </div>
    </section>
  )
}