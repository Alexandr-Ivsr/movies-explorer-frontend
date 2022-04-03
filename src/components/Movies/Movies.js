import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';
import RenderMovies from '../RenderMovies/RenderMovies';

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }

    if (localStorage.getItem('movies')) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }
    getSavedFilms();
  }, []);

  const getSavedFilms = () => {
    MainApi.getSavedMovies()
    .then((res) => {
      setSavedMovies(res);
    })
    .catch((err) => {
      console.log(err, err.message);
      setIsError(true);
    })
  }

  // запрос фильмов, их сохранение и фильтр по ключевому слову
  const showFilms = (inputValue, isCheckBoxActive) => {
    const searchValue = inputValue.toLowerCase();
    let filteredArrayByName;

    if (movies.length === 0) {
      setIsLoading(true);

      MoviesApi.getAllMovies()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          setMovies(res);

          filteredArrayByName = res.filter((item) => {
            return (!!item.nameRU && item.nameRU.toLowerCase().includes(searchValue)) || (!!item.description && item.description.toLowerCase().includes(searchValue))
          });

          setFilteredMovies(filteredArrayByName);
          localStorage.setItem('filteredMovies', JSON.stringify(filteredArrayByName));
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      filteredArrayByName = movies.filter((item) => {
        return (!!item.nameRU && item.nameRU.toLowerCase().includes(searchValue)) || (!!item.description && item.description.toLowerCase().includes(searchValue))
      });

      setFilteredMovies(filteredArrayByName);
      localStorage.setItem('filteredMovies', JSON.stringify(filteredArrayByName));
    }

    localStorage.setItem('searchMoviesValue', inputValue);
    localStorage.setItem('stateCheckboxMovies', isCheckBoxActive);
  }

  const handleMovieBtn = (data) => {
    let match = savedMovies.find((item) => {
      return item.movieId === data.movieId;
    })

    if (match?._id) {
      MainApi.deleteMovie(match._id)
        .then(() => {
          getSavedFilms();
        })
        .catch((err) => {
          console.log(err, err.message);
        })
    } else {
      MainApi.addMovie(data)
        .then(() => {
          getSavedFilms();
        })
        .catch((err) => {
          console.log(err, err.message);
        })
    }
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
          filteredMovies.length > 0 ? (
            <RenderMovies moviesCards={filteredMovies} savedMovies={savedMovies} isCheckBoxActive={isCheckBoxActive} onBtnMovieClick={handleMovieBtn} />
          ) : (
            <div className="movies__notfound">Ничего не найдено</div>
          )
          : null}
      </main>
      <Footer />
    </>
  )
}