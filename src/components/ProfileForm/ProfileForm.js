import React from 'react';
import './ProfileForm.css';

export default function ProfileForm(props) {
  
  const onEdit = () => {
    props.onHandleEdit();
  }

  return (
    <div className="profile-form">
      <div className="profile-form__container">
        <form className="profile-form__form">
          <div className="profile-form__inputs-wrapper">
            <label className="profile-form__label-input">
              Имя
              <input required type="email" className="profile-form__input" placeholder="Введите имя" name="name" />
            </label>
            <label className="profile-form__label-input">
              E-mail
              <input required type="password" className="profile-form__input profile-form__input_type_error" placeholder="Введите email" name="email" />
              <span className="profile-form__input-error">Что-то пошло не так...</span>
            </label>
          </div>
          <button className="profile-form__form-button" type="submit" onClick={onEdit}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}
