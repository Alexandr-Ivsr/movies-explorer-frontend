import React, { useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import ProfileForm from '../ProfileForm/ProfileForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Tooltip from '../Tooltip/Tooltip';


export default function Profile(props) {
  const [isEdit, setIsEdit] = useState(false);
  const userInfo = React.useContext(CurrentUserContext);

  const handleSignout = () => {
    props.onSignoutUser();
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${userInfo.name}!`}</h1>
          {isEdit ? (
            <ProfileForm
              onUpdateCurrentUser={props.onUpdateCurrentUser}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              isUpdateUserRequestWrong={props.isUpdateUserRequestWrong}
              isErrorMessage={props.isErrorMessage}
            />
          ) : (
            <>
              <div className="profile__info">
                <div className="profile__info-wrapper">
                  <span className="profile__info-field">Имя</span>
                  <span className="profile__info-field-value">{userInfo.name}</span>
                </div>
                <div className="profile__info-wrapper">
                  <span className="profile__info-field">E-mail</span>
                  <span className="profile__info-field-value">{userInfo.email}</span>
                </div>
              </div>
              <button className="profile__button-edit" onClick={() => setIsEdit(true)}>Редактировать</button>
            </>
          )}
          <button className="profile__button-exit" onClick={handleSignout}>Выйти из аккаунта</button>
        </div>
        <Tooltip setIsTooltipOpen={props.setIsTooltipOpen} isTooltipOpen={props.isTooltipOpen} />
      </section>
    </>
  )
}