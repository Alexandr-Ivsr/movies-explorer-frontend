import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import * as MainApi from '../../utils/MainApi';
import RenderSavedMovies from '../RenderSavedMovies/RenderSavedMovies';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchedValue, setSearchedValue] = useState(localStorage.getItem("searchMoviesValue"));
  const userInfo = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (userInfo._id) {
      setIsLoading(true);

      MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res.filter((item) => item.owner === userInfo._id));
        setFilteredMovies(res.filter((item) => item.owner === userInfo._id));
      })
      .catch((err) => {
        console.log(err, err.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }, [userInfo])

  const showSavedMovies = (inputValue) => {
    setIsLoading(true);
    const searchValue = inputValue.toLowerCase();
    setSearchedValue(searchValue);

    setTimeout(() => {
      const filteredArrayByName = savedMovies.filter((item) => {
        return (!!item.nameRU && item.nameRU.toLowerCase().includes(searchValue)) || (!!item.description && item.description.toLowerCase().includes(searchValue))
      });

      setIsLoading(false);
      setFilteredMovies(filteredArrayByName);
    }, 500);
  }

  const handleBtnMovieClick = (id) => {
    MainApi.deleteMovie(id)
      .then(() => {
        const deletedIndexSaved = savedMovies.findIndex((item) => item._id === id);
        setSavedMovies([...savedMovies.slice(0, deletedIndexSaved), ...savedMovies.slice(deletedIndexSaved + 1)]);
        const deletedIndexFiltered = filteredMovies.findIndex((item) => item._id === id);
        setFilteredMovies([...filteredMovies.slice(0, deletedIndexFiltered), ...filteredMovies.slice(deletedIndexFiltered + 1)]);
      })
      .catch((err) => {
        console.log(err, err.message);
      })
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm onShowSavedMovies={showSavedMovies} isSavedMovies={true} onsetIsCheckBoxActive={setIsCheckBoxActive} />
      {isLoading ? <Preloader /> : null}
      {isError && (
        <div className="saved-movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      )}
      {!isLoading && !isError && filteredMovies.length > 0 && (
        <RenderSavedMovies movies={filteredMovies} isSavedMovies={true} isCheckBoxActive={isCheckBoxActive} onBtnMovieClick={handleBtnMovieClick} />
      )}
      {!isLoading && !isError && savedMovies.length > 0 && filteredMovies.length === 0 && searchedValue && (
        <div className="movies__notfound">Ничего не найдено</div>
      )}
      <Footer />
    </>
  )
}