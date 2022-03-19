import React from 'react';
import './SearchForm.css';

export default function SearchForm(props) {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__form-wrapper">
          <input className="search-form__input-text" required type="text" placeholder="Фильм" name="search" />
          <button className="search-form__form-button" type="submit">Найти</button>
        </div>
        <div className="search-form__filter">
          <input className="search-form__custom-checkbox" type="checkbox" id="Короткометражки" name="filter" />
          <label className="search-form__label" for="Короткометражки">Короткометражки</label>
        </div>
      </form>
    </section>
  )
}