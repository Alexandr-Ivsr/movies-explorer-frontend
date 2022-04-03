import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  return (
    <section className="moviescardlist">
      {props.isSavedMovies ?
        props.sliceSavedMovies.map((item) => {
          return (
            <MoviesCard key={item._id} movie={item} isSavedMovies={props.isSavedMovies} onBtnMovieClick={props.onBtnMovieClick} />
          )
        })
        :
        props.sliceMovies.map((item) => {
          return (
            <MoviesCard
              key={item.id}
              movie={item}
              onBtnMovieClick={props.onBtnMovieClick}
              savedMovies={props.savedMovies}
            />
          )
        })}
    </section>
  )
}