import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import './Login.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Login(props) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate('/');
    }
  }, [props.loggedIn]);

  const handleChangeEmail = (evt) => {
    setEmailValue(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPasswordValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onSigninUser({
      email: emailValue,
      password: passwordValue,
    });
  }

  return (
    <section className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <Link className="form__logotype" to="/">
          <img className="form__logotype-image" src={HeaderLogo} alt="логотип" />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__form">
          <div className="form__inputs-wrapper form__inputs-wrapper_type_login">
            <label className="form__label-input">
              E-mail
              <input
                required type="email"
                className="form__input"
                value={emailValue}
                onChange={handleChangeEmail}
                placeholder="Введите email"
                name="email"
              />
            </label>
            <label className="form__label-input">
              Пароль
              <input
                required type="password"
                className="form__input form__input_type_error"
                value={passwordValue}
                onChange={handleChangePassword}
                placeholder="Введите пароль"
                name="password"
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>
          </div>
          <button className="form__form-button" type="submit">Войти</button>
        </form>
        <p className="form__wrapper">
          <span className="form__wrapper-text">Ещё не зарегистрированы?</span>
          <Link className="form__wrapper-link" to="/signup">Регистрация</Link>
        </p>
      </div>
    </section>
  )
}