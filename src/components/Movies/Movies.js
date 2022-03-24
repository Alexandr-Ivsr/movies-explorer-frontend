import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import * as MoviesApi from '../../utils/MoviesApi';

export default function Movies(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // запрос фильмов, их сохранение и фильтр
  const showFilms = (inputValue, isCheckBoxActive) => {
    setIsLoading(true);
    const searchValue = inputValue.toLowerCase();

    MoviesApi.getAllMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res)); // добавить здесь сохранение состояние чекбокса и текста инпута в localstorage
        localStorage.setItem('inputValue', inputValue);
        localStorage.setItem('isCheckBoxActive', isCheckBoxActive);
        // вынести в useEffect при монтировании
        const saveCheckBoxState = localStorage.getItem('isCheckBoxActive') === 'true';

        const arrayMovies = JSON.parse(localStorage.getItem('movies'));

        // найти фильм в этом массиве по ключевым словам
        const filteredArrayByName = arrayMovies.filter((item) => {
          return (!!item.nameRU && item.nameRU.includes(searchValue)) || (!!item.description && item.description.includes(searchValue))
        })

        // найти фильм из отфильтрованных по длительности
        if (isCheckBoxActive) {
          const filteredArrayByDuration = filteredArrayByName.filter((item) => {
            return item.duration <= 40;
          })
          setMovies(filteredArrayByDuration);
          console.log(filteredArrayByDuration);
        } else {
          setMovies(filteredArrayByName);
          console.log(filteredArrayByName);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleAppendCards = () => {

  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onShowFilms={showFilms} />
        {isLoading ? <Preloader /> : null}
        {isError ?
          (<div className="movies__error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
          </div>) : null}
        {!isLoading && !isError ?
          movies.length > 0 ? (
            <MoviesCardList moviesCards={movies} onHandleAppendCards={handleAppendCards} />
          ) : (
            <div className="movies__notfound">Ничего не найдено</div>
          )
          : null}
      </main>
      <Footer />
    </>
  )
}