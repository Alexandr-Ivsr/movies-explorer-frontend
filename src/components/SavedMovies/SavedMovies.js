import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import * as MainApi from '../../utils/MainApi';
import RenderSavedMovies from '../RenderSavedMovies/RenderSavedMovies';
import Footer from '../Footer/Footer';

export default function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [isError, setIsError] = useState(false);

  const getSavedFilms = () => {
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setFilteredMovies(res);
      })
      .catch((err) => {
        console.log(err, err.message);
        setIsError(true);
      })
  }

  useEffect(() => {
    getSavedFilms();
  }, [])

  const showSavedMovies = (inputValue) => {
    const searchValue = inputValue.toLowerCase();

    const filteredArrayByName = savedMovies.filter((item) => {
      return (!!item.nameRU && item.nameRU.toLowerCase().includes(searchValue)) || (!!item.description && item.description.toLowerCase().includes(searchValue))
    });


    setFilteredMovies(filteredArrayByName);
  }

  const handleBtnMovieClick = (id) => {
    MainApi.deleteMovie(id)
      .then((res) => {
        getSavedFilms();
      })
      .catch((err) => {
        console.log(err, err.message);
      })
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm onShowSavedMovies={showSavedMovies} isSavedMovies={true} onsetIsCheckBoxActive={setIsCheckBoxActive} />
      {isError ? (
        <div className="saved-movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      ) : null}
      {!isError ?
        savedMovies.length > 0 ? (
          <RenderSavedMovies movies={filteredMovies} isSavedMovies={true} isCheckBoxActive={isCheckBoxActive} onBtnMovieClick={handleBtnMovieClick} />
        ) : (
          <div className="movies__notfound">Ничего не найдено</div>
        ) : null}
      <Footer />
    </>
  )
}