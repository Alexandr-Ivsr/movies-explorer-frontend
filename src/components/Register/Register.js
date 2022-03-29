import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import './Register.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Register(props) {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate('/');
    }
  }, [props.loggedIn]);

  const handleChangeName = (evt) => {
    setNameValue(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setEmailValue(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPasswordValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onSignupUser({
      name: nameValue,
      email: emailValue,
      password: passwordValue
    })
  }

  return (
    <section className="form">
      <div className="form__container">
        <Link className="form__logotype" to="/">
          <img className="form__logotype-image" src={HeaderLogo} alt="логотип" />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__inputs-wrapper">
            <label className="form__label-input">
              Имя
              <input
                value={nameValue}
                onChange={handleChangeName}
                required type="text"
                className="form__input"
                placeholder="Введите имя"
                name="name"
              />
            </label>
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
          {props.isRequestWrong ? (<span className="form__submit-error" >{props.isErrorMessage}</span>) : ''}
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