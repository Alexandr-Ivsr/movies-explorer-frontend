import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {/* <Preloader /> */}
      </main>
    </>
  )
}