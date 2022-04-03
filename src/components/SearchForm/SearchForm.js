import React, { useEffect, useState } from 'react';
import './SearchForm.css';

export default function SearchForm(props) {
  const [filmSearchValue, setFilmSearchValue] = useState('');
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [filmSearchError, setFilmSearchError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('searchMoviesValue') && localStorage.getItem('stateCheckboxMovies') && !props.isSavedMovies) {
      setFilmSearchValue(localStorage.getItem('searchMoviesValue'));
      setIsCheckBoxActive(localStorage.getItem('stateCheckboxMovies') === 'true');
      props.onsetIsCheckBoxActive(localStorage.getItem('stateCheckboxMovies') === 'true');
    }
  }, []);

  const changeFilmSearchValue = (evt) => {
    setFilmSearchValue(evt.target.value);

    if (evt.target.value.length === 0) {
      setFilmSearchError('Нужно ввести ключевое слово');
    }
    else {
      setFilmSearchError('');
    }
  }

  const handleSubmitMovies = (evt) => {
    evt.preventDefault();

    props.onShowFilms(filmSearchValue, isCheckBoxActive);
  }

  const handleSubmitSavedMovies = (evt) => {
    evt.preventDefault();

    props.onShowSavedMovies(filmSearchValue, isCheckBoxActive)
  }

  const handleCheckBox = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
    props.onsetIsCheckBoxActive(!isCheckBoxActive);
    localStorage.setItem('stateCheckboxMovies', !isCheckBoxActive);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" noValidate onSubmit={props.isSavedMovies ? handleSubmitSavedMovies : handleSubmitMovies}>
        <div className="search-form__form-wrapper">
          <input
            className="search-form__input-text"
            onChange={changeFilmSearchValue}
            value={filmSearchValue}
            required
            type="text"
            placeholder="Фильм"
            name="search"
          />
          {filmSearchError && <span className='search-form__input-error'>{filmSearchError}</span>}
          <button className="search-form__form-button" disabled={filmSearchValue.length === 0} type="submit">Найти</button>
        </div>
        <div className="search-form__filter">
          <input
            className="search-form__custom-checkbox"
            type="checkbox"
            id="Короткометражки"
            onChange={handleCheckBox}
            checked={isCheckBoxActive}
            name="filter"
          />
          <label className="search-form__label" htmlFor="Короткометражки">Короткометражки</label>
        </div>
      </form>
    </section>
  )
}