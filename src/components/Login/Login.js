import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import './Login.css';
import HeaderLogo from '../../images/logo-header.svg';
import { useForm } from 'react-hook-form';

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
    }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn) {
      navigate('/');
    }
  }, [props.loggedIn]);

  const onSubmit = (data) => {
    props.onSigninUser(data);
  }

  return (
    <section className="form" onSubmit={handleSubmit(onSubmit)}>
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
                {...register('email', {
                  required: 'Поле email не может быть пустым',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Введен некорректный адрес почты',
                  },
                })}
                type="email"
                className={`form__input ${errors?.email ? 'form__input_type_error' : ''}`}
                placeholder="Введите email"
              />
              {errors?.email && <span className="form__input-error">{errors?.email?.message}</span>}
            </label>
            <label className="form__label-input">
              Пароль
              <input
                {...register('password', {
                  required: 'Поле password не может быть пустым',
                  minLength: {
                    value: 8,
                    message: 'Поле password должно содержать минимум 8 символов',
                  },
                })}
                type="password"
                className={`form__input ${errors?.password ? 'form__input_type_error' : ''}`}
                placeholder="Введите пароль"
              />
              {errors?.password && <span className="form__input-error">{errors?.password?.message}</span>}
            </label>
          </div>
          {props.isLoginRequestWrong ? (<span className="form__submit-error" >{props.isErrorMessage}</span>) : ''}
          <button
            className={`form__form-button ${!isValid ? 'form__form-button_type_disabled' : ''}`}
            disabled={!isValid}
            type="submit">
            Войти
          </button>
        </form>
        <p className="form__wrapper">
          <span className="form__wrapper-text">Ещё не зарегистрированы?</span>
          <Link className="form__wrapper-link" to="/signup">Регистрация</Link>
        </p>
      </div>
    </section>
  )
}