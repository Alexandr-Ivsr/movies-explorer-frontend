import React, { useState, useEffect } from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function RenderSavedMovies(props) {
  const [sliceSavedMovies, setSliceSavedMovies] = useState([]);

  useEffect(() => {
    let filteredArray;

    if (props.isCheckBoxActive) {
      filteredArray = props.movies.filter((item) => item.duration <= 40);
    } else {
      filteredArray = props.movies;
    }

    setSliceSavedMovies(filteredArray);
  }, [props.movies, props.isCheckBoxActive]);

  return (
    <MoviesCardList sliceSavedMovies={sliceSavedMovies} isSavedMovies={props.isSavedMovies} onBtnMovieClick={props.onBtnMovieClick} />
  )
}