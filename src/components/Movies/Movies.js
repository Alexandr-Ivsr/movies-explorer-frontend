import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import * as MoviesApi from '../../utils/MoviesApi';

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }
  }, []);

  // запрос фильмов, их сохранение и фильтр по ключевому слову
  const showFilms = (inputValue, isCheckBoxActive) => {
    setIsLoading(true);
    const searchValue = inputValue.toLowerCase();

    MoviesApi.getAllMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        localStorage.setItem('inputValue', inputValue);
        localStorage.setItem('isCheckBoxActive', isCheckBoxActive);

        const arrayMovies = JSON.parse(localStorage.getItem('movies'));

        const filteredArrayByName = arrayMovies.filter((item) => {
          return (!!item.nameRU && item.nameRU.includes(searchValue)) || (!!item.description && item.description.includes(searchValue))
        })

        setMovies(filteredArrayByName);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredArrayByName));
        console.log(filteredArrayByName);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm onShowFilms={showFilms} onsetIsCheckBoxActive={setIsCheckBoxActive} />
        {isLoading ? <Preloader /> : null}
        {isError ?
          (<div className="movies__error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
          </div>) : null}
        {!isLoading && !isError ?
          movies.length > 0 ? (
            <MoviesCardList moviesCards={movies} isCheckBoxActive={isCheckBoxActive} />
          ) : (
            <div className="movies__notfound">Ничего не найдено</div>
          )
          : null}
      </main>
      <Footer />
    </>
  )
}