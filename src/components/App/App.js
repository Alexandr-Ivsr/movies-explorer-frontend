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
  const [LoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

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
      })
      .catch((err) => {
        console.log(err, err.status, err.message);
      })
  }

  // авторизация
  const handleSigninUser = (data) => {
    MainApi.signin(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  // выход из профиля, удаление токена из куков
  const handleSignoutUser = () => {
    MainApi.signout()
      .then((res) => {
        console.log(res.message);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main LoggedIn={LoggedIn} />}></Route>
          <Route path='/movies' element={<Movies LoggedIn={LoggedIn} />}></Route>
          <Route path='/saved-movies' element={<SavedMovies LoggedIn={LoggedIn} />}></Route>
          <Route path='/profile' element={<Profile LoggedIn={LoggedIn} onSignoutUser={handleSignoutUser} />}></Route>
          <Route path='/signin' element={<Login onSigninUser={handleSigninUser} />}></Route>
          <Route path='/signup' element={<Register onSignupUser={handleSignupUser} />}></Route>
          <Route path='/pagenotfound' element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
