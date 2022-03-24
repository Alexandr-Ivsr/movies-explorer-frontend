import React, { useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import ProfileForm from '../ProfileForm/ProfileForm';


export default function Profile(props) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(false);
  }

  return (
    <>
      <Header />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          {isEdit ? (
            <ProfileForm onHandleEdit={handleEdit} />
          ) : (
            <>
              <div className="profile__info">
                <div className="profile__info-wrapper">
                  <span className="profile__info-field">Имя</span>
                  <span className="profile__info-field-value">Виталий</span>
                </div>
                <div className="profile__info-wrapper">
                  <span className="profile__info-field">E-mail</span>
                  <span className="profile__info-field-value">pochta@yandex.ru</span>
                </div>
              </div>
              <button className="profile__button-edit" onClick={() => setIsEdit(true)}>Редактировать</button>
            </>
          )}
          <a className="profile__link" href="/signin">Выйти из аккаунта</a>
        </div>
      </section>
    </>
  )
}