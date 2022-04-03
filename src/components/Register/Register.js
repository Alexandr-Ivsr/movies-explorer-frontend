import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import './Register.css';
import HeaderLogo from '../../images/logo-header.svg';

export default function Register(props) {
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
      name: '',
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
    props.onSignupUser(data);
  }

  return (
    <section className="form">
      <div className="form__container">
        <Link className="form__logotype" to="/">
          <img className="form__logotype-image" src={HeaderLogo} alt="логотип" />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__inputs-wrapper">
            <label className="form__label-input">
              Имя
              <input
                {...register('name', {
                  required: 'Поле name не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Длина поля name должна быть не меньше 2 символов',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Длина поля name должна быть не больше 30 символов',
                  },
                  pattern: {
                    value: /[A-Za-zА-Яа-я-\s]+$/,
                    message: 'Поле name должно содержать латиницу, кирилицу, пробел или дефис',
                  }
                })}
                type="text"
                className={`form__input ${errors?.name ? 'form__input_type_error' : ''}`}
                placeholder="Введите имя"
              />
              {errors?.name && <span className="form__input-error">{errors?.name?.message}</span>}
            </label>
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
          {props.isRegisterRequestWrong ? (<span className="form__submit-error" >{props.isErrorMessage}</span>) : ''}
          <button
            className={`form__form-button ${!isValid ? 'form__form-button_type_disabled' : ''}`}
            disabled={!isValid}
            type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="form__wrapper">
          <span className="form__wrapper-text">Уже зарегистрированы?</span>
          <Link className="form__wrapper-link" to="/signin">Войти</Link>
        </p>
      </div>
    </section>
  )
}