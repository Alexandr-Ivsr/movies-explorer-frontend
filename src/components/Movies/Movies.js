import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';
import RenderMovies from '../RenderMovies/RenderMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedValue, setSearchedValue] = useState(localStorage.getItem("searchMoviesValue"));
  const userInfo = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }

    if (localStorage.getItem('movies')) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);

  useEffect(() => {
    if (userInfo._id) {
      MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res.filter((item) => item.owner === userInfo._id));
      })
      .catch((err) => {
        console.log(err, err.message);
        setIsError(true);
      })
    }
  }, [userInfo]);

  const showFilms = (inputValue, isCheckBoxActive) => {
    setIsLoading(true);
    const searchValue = inputValue.toLowerCase();
    let filteredArrayByName;
    setSearchedValue(searchValue);

    if (movies.length === 0) {
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
      setTimeout(() => {
        filteredArrayByName = movies.filter((item) => {
          return (!!item.nameRU && item.nameRU.toLowerCase().includes(searchValue)) || (!!item.description && item.description.toLowerCase().includes(searchValue))
        });

        setIsLoading(false);
        setFilteredMovies(filteredArrayByName);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredArrayByName));
      }, 500);
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
          const deletedIndex = savedMovies.findIndex((item) => item.movieId === match.movieId);
          setSavedMovies([...savedMovies.slice(0, deletedIndex), ...savedMovies.slice(deletedIndex + 1)]);
        })
        .catch((err) => {
          console.log(err, err.message);
        })
    } else {
      MainApi.addMovie(data)
        .then((res) => {
          setSavedMovies([...savedMovies, res])
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
        {isError && (
          <div className="movies__error">
            ???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????
          </div>
          )}
        {!isLoading && !isError && filteredMovies.length > 0 && (
          <RenderMovies moviesCards={filteredMovies} savedMovies={savedMovies} isCheckBoxActive={isCheckBoxActive} onBtnMovieClick={handleMovieBtn} />
        )}
        {!isLoading && !isError && movies.length > 0 && filteredMovies.length === 0 && searchedValue && (
          <div className="movies__notfound">???????????? ???? ??????????????</div>
        )}
      </main>
      <Footer />
    </>
  )
}