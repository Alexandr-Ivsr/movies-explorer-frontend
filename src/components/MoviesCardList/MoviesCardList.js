import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <section className="moviescardlist">
      <MoviesCard isSavedMovies={props.isSavedMovies} />
    </section>
  )
}