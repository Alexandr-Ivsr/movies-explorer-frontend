import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm(props) {
  const [filmSearchValue, setFilmSearchValue] = useState('');
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

  const changeFilmSearchValue = (evt) => {
    setFilmSearchValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onShowFilms(filmSearchValue, isCheckBoxActive);
  }

  const handleCheckBox = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
    props.onsetIsCheckBoxActive(!isCheckBoxActive);
  }

  // const filteredByCheckBox = () => {

  // }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__form-wrapper">
          <input className="search-form__input-text" onChange={changeFilmSearchValue} value={filmSearchValue} required type="text" placeholder="Фильм" name="search" />
          <button className="search-form__form-button" type="submit">Найти</button>
        </div>
        <div className="search-form__filter">
          <input className="search-form__custom-checkbox" type="checkbox" id="Короткометражки" onChange={handleCheckBox} checked={isCheckBoxActive} name="filter" />
          <label className="search-form__label" htmlFor="Короткометражки">Короткометражки</label>
        </div>
      </form>
    </section>
  )
}