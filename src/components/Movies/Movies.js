import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function Movies(props) {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList />
        <div className="movies__button-wrapper">
          <button className="movies__button-append">Ещё</button>
        </div>
      </main>
      <Footer />
    </>
  )
}