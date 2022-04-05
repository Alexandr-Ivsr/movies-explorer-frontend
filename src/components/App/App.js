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
  const [isLoginRequestWrong, setIsLoginRequestWrong] = useState(false);
  const [isRegisterRequestWrong, setIsRegisterRequestWrong] = useState(false);
  const [isUpdateUserRequestWrong, setIsUpdateUserRequestWrong] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');
  const isAuth = localStorage.getItem('isAuth') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    MainApi.getCurrentUser()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        localStorage.setItem('isAuth', true);
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('isAuth', false);
      })
  }, []);

  const handleSignupUser = (data) => {
    MainApi.signup(data)
      .then((res) => {
        navigate('/signin');
        setIsRegisterRequestWrong(false);
        handleSigninUser(data);
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterRequestWrong(true);
        setIsErrorMessage(err.message);
      })
  }

  const handleSigninUser = (data) => {
    MainApi.signin(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('isAuth', true);
        setCurrentUser(res);
        setIsLoginRequestWrong(false);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsLoginRequestWrong(true);
        setIsErrorMessage(err.message);
      })
  }

  const handleSignoutUser = () => {
    console.log('fsdfsdf');
    if (loggedIn) {
      MainApi.signout()
        .then((res) => {
          setLoggedIn(false);
          console.log(res, 'logout success');
          localStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }

  const handleUpdateCurrentUserInfo = (data, setIsEdit) => {
    MainApi.updateCurrentUserInfo(data, setIsEdit)
      .then((res) => {
        setCurrentUser(res);
        setIsUpdateUserRequestWrong(false);
        setIsEdit(false);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdateUserRequestWrong(true);
        setIsErrorMessage(err.message);
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
                isUpdateUserRequestWrong={isUpdateUserRequestWrong}
                isErrorMessage={isErrorMessage}
              />
            }>
          </Route>
          <Route
            path='/signup'
            element={
              <Register
                onSignupUser={handleSignupUser}
                loggedIn={loggedIn}
                isRegisterRequestWrong={isRegisterRequestWrong}
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
                isLoginRequestWrong={isLoginRequestWrong}
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
