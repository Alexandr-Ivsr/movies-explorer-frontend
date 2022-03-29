import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowSize from '../../utils/CheckWindowSize';


export default function MoviesCardList(props) {
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
    <section className="moviescardlist">
      {sliceMovies.map((item) => {
        return (
          <MoviesCard key={item.id} movie={item} isSavedMovies={props.isSavedMovies} />
        )
      })}
      {filteredMovies.length !== sliceMovies.length ? (
        <div className="moviescardlist__button-wrapper">
          <button className="moviescardlist__button-append" onClick={handleAppendCards}>Ещё</button>
        </div>
      ) :
        null}
    </section>
  )
}