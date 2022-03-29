import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import RequireAuth from '../RequireAuth/RequireAuth';
import * as MainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRequestWrong, setIsRequestWrong] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');
  const navigate = useNavigate();

  const isAuth = localStorage.getItem('isAuth') === 'true';
  console.log('isAuth', isAuth);

  // проверка токена при запуске приложения
  useEffect(() => {
    MainApi.getCurrentUser()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  // регистрация
  const handleSignupUser = (data) => {
    MainApi.signup(data)
      .then((res) => {
        navigate('/signin');
        setIsRequestWrong(false);
      })
      .catch((err) => {
        console.log(err);
        setIsRequestWrong(true);
        setIsErrorMessage(err.message);
      })
  }

  // авторизация
  const handleSigninUser = (data) => {
    MainApi.signin(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        setIsRequestWrong(false);
        navigate('/movies');
        localStorage.setItem('isAuth', true);
      })
      .catch((err) => {
        console.log(err);
        setIsRequestWrong(true);
        setIsErrorMessage(err.message);

      })
  }

  // выход из профиля, удаление токена из куков
  const handleSignoutUser = () => {
    MainApi.signout()
      .then((res) => {
        console.log(res.message);
        navigate('/');
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUpdateCurrentUserInfo = (data, setIsEdit) => {
    MainApi.updateCurrentUserInfo(data, setIsEdit)
      .then((res) => {
        setCurrentUser(res);
        setIsEdit(false);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path='/'
            element={
              <Main
                loggedIn={loggedIn}
              />
            }>
          </Route>
          <Route
            path='/movies'
            element={
              <RequireAuth
                component={Movies}
                loggedIn={loggedIn}
                isAuth={isAuth}
              />
            }>
          </Route>
          <Route
            path='/saved-movies'
            element={
              <RequireAuth
                component={SavedMovies}
                loggedIn={loggedIn}
                isAuth={isAuth}
              />
            }>
          </Route>
          <Route
            path='/profile'
            element={
              <RequireAuth
                component={Profile}
                loggedIn={loggedIn}
                onSignoutUser={handleSignoutUser}
                onUpdateCurrentUser={handleUpdateCurrentUserInfo}
                isTooltipOpen={isTooltipOpen}
                setIsTooltipOpen={setIsTooltipOpen}
                isAuth={isAuth}
              />
            }>
          </Route>
          <Route
            path='/signup'
            element={
              <Register
                onSignupUser={handleSignupUser}
                loggedIn={loggedIn}
                isRequestWrong={isRequestWrong}
                isErrorMessage={isErrorMessage}
              />
            }>
          </Route>
          <Route
            path='/signin'
            element={
              <Login
                onSigninUser={handleSigninUser}
                loggedIn={loggedIn}
                isRequestWrong={isRequestWrong}
                isErrorMessage={isErrorMessage}
              />
            }>
          </Route>
          <Route
            path='*'
            element={
              <PageNotFound />
            }>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
