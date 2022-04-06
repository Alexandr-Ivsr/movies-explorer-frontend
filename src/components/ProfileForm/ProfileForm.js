import React from 'react';
import './ProfileForm.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

export default function ProfileForm(props) {
  const userInfo = React.useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    getValues,
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

  const onSubmit = (data) => {
    props.onUpdateCurrentUser(data, props.setIsEdit)
  }

  const validateValues = () => {
    const nameValue = getValues("name");
    const emailValue = getValues("email");

    if (nameValue !== userInfo.name || emailValue !== userInfo.email) {
      return true
    }

    return 'Данное значение уже используется в вашем профиле'
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
                  validate: validateValues,
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
                  validate: validateValues,
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
