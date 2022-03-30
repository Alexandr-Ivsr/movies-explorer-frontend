import React, { useState } from 'react';
import './ProfileForm.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

export default function ProfileForm(props) {
  const userInfo = React.useContext(CurrentUserContext);
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
    }
  })
  console.log(userInfo.name, userInfo.email, isValid);

  const onSubmit = (data) => {
    console.log(data);
    props.onUpdateCurrentUser(data, props.setIsEdit)
  }

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <form className="profile-form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile-form__inputs-wrapper">
            <label className="profile-form__label-input">
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
                    value: /^[A-Za-zА-Яа-я-\s]+$/,
                    message: 'Поле name должно содержать латиницу, кирилицу, пробел или дефис',
                  },
                  validate: value => value !== userInfo.name || 'Данное имя уже используется в вашем профиле',
                })}
                type="text"
                className={`profile-form__input ${errors?.name ? 'profile-form__input_type_error' : ''}`}
                placeholder="Введите имя"
              />
              {errors?.name && (<span className="profile-form__input-error">{errors?.name?.message}</span>)}
            </label>
            <label className="profile-form__label-input">
              E-mail
              <input
                {...register('email', {
                  required: 'Поле email не может быть пустым',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Введен некорректный адрес почты',
                  },
                  validate: (value) => {
                    return value !== userInfo.email || 'Эта почта уже используется в вашем профиле';
                  },
                })}
                type="email"
                className={`profile-form__input ${errors?.email ? 'profile-form__input_type_error' : ''}`}
                placeholder="Введите email"
              />
              {errors?.email && (<span className="profile-form__input-error">{errors?.email?.message}</span>)}
            </label>
          </div>
          {props.isUpdateUserRequestWrong ? (<span className="profile-form__submit-error" >{props.isErrorMessage}</span>) : ''}
          <button
            className={`profile-form__form-button ${!isValid ? 'profile-form__form-button_type_disabled' : ''}`}
            disabled={!isValid}
            type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}
