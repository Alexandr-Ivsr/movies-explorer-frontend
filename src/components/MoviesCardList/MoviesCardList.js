import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowSize from '../../utils/CheckWindowSize';


export default function MoviesCardList(props) {
  const [sliceMovies, setSliceMovies] = useState([]);
  const widthWindow = useWindowSize();

  useEffect(() => {
    console.log(window.innerWidth)
    if (window.innerWidth >= 768) {
      setSliceMovies(props.moviesCards.slice(0, 7));
    } else if (window.innerWidth >= 320) {
      setSliceMovies(props.moviesCards.slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (widthWindow >= 768) {
      setSliceMovies(props.moviesCards.slice(0, 7));
    } else if (widthWindow >= 320) {
      setSliceMovies(props.moviesCards.slice(0, 5));
    }
  }, [widthWindow, props.moviesCards]);

  const handleAppendCards = () => {
    if (window.innerWidth >= 768) {
      // склеить это в массив для отрисовки
      const newPartOfArr = props.moviesCards.slice(sliceMovies.length, sliceMovies.length + 7);
      setSliceMovies(sliceMovies.concat(newPartOfArr));
    } else if (window.innerWidth >= 320) {
      const newPartOfArr = props.moviesCards.slice(sliceMovies.length, sliceMovies.length + 5);
      setSliceMovies(sliceMovies.concat(newPartOfArr));
    }
  }

  return (
    <section className="moviescardlist">
      {sliceMovies.map((item) => {
        return (
          <MoviesCard key={item.id} movie={item} isSavedMovies={props.isSavedMovies} />
        )
      })}
      {props.moviesCards.length !== sliceMovies.length ? (
        <div className="moviescardlist__button-wrapper">
          <button className="moviescardlist__button-append" onClick={handleAppendCards}>Ещё</button>
        </div>
      ) :
        null}

    </section>
  )
}