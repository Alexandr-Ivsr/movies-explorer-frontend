import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMovies={true} />
      <Footer />
    </>
  )
}