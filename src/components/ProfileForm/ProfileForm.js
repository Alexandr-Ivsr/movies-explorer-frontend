import React, { useState } from 'react';
import './ProfileForm.css';

export default function ProfileForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeNameValue = (evt) => {
    setName(evt.target.value);
  }

  const changeEmailValue = (evt) => {
    setEmail(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateCurrentUser({
      name: name,
      email: email,
    }, props.setIsEdit)
  }

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <form className="profile-form__form" onSubmit={handleSubmit}>
          <div className="profile-form__inputs-wrapper">
            <label className="profile-form__label-input">
              Имя
              <input
                required
                type="text"
                className="profile-form__input"
                value={name}
                onChange={changeNameValue}
                placeholder="Введите имя"
                name="name"
              />
            </label>
            <label className="profile-form__label-input">
              E-mail
              <input
                required
                type="email"
                className="profile-form__input profile-form__input_type_error"
                value={email}
                onChange={changeEmailValue}
                placeholder="Введите email"
                name="email"
              />
              <span className="profile-form__input-error">Что-то пошло не так...</span>
            </label>
          </div>
          <button className="profile-form__form-button" type="submit">Редактировать</button>
        </form>
      </div>
    </div>
  )
}
