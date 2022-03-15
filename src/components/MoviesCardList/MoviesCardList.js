import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <>
      <section className="moviescardlist">
        <MoviesCard />
      </section>
      <div className="moviescardlist__button-wrapper">
        <button className="moviescardlist__button-append">Ещё</button>
      </div>
    </>
  )
}