import React, { useEffect, useState } from "react";
import './RenderMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useWindowSize from '../../utils/CheckWindowSize';

export default function RenderMovies(props) {
  const [sliceMovies, setSliceMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const widthWindow = useWindowSize();

  useEffect(() => {
    let value;
    let filteredArray;

    if (widthWindow >= 768) {
      value = 7;
    } else if (widthWindow >= 320) {
      value = 5;
    }

    if (props.isCheckBoxActive) {
      filteredArray = props.moviesCards.filter((item) => item.duration <= 40);
    } else {
      filteredArray = props.moviesCards;
    }

    setFilteredMovies(filteredArray);
    setSliceMovies(filteredArray.slice(0, value));
  }, [widthWindow, props.moviesCards, props.isCheckBoxActive]);

  const handleAppendCards = () => {
    if (widthWindow >= 768) {
      const newPartOfArr = filteredMovies.slice(sliceMovies.length, sliceMovies.length + 7);
      setSliceMovies(sliceMovies.concat(newPartOfArr));
    } else if (widthWindow >= 320) {
      const newPartOfArr = filteredMovies.slice(sliceMovies.length, sliceMovies.length + 5);
      setSliceMovies(sliceMovies.concat(newPartOfArr));
    }
  }

  return (
    <>
      <MoviesCardList sliceMovies={sliceMovies} savedMovies={props.savedMovies} onBtnMovieClick={props.onBtnMovieClick} />
      {filteredMovies.length !== sliceMovies.length ? (
        <div className="render-movies__button-wrapper">
          <button className="render-movies__button-append" onClick={handleAppendCards}>Ещё</button>
        </div>
      ) :
        null}
    </>
  )
}