import React from 'react';
import './MoviesCard.css';
import getTimeFromMins from '../../utils/getTimeFromMins';

export default function MoviesCard(props) {
  return (
    <div className="moviescard">
      <img className="moviescard__movie-image"
        src={`https://api.nomoreparties.co/${props.movie.image.url}`}
        alt="мини-иллюстрация к фильму" />
      <div className="moviescard__wrapper">
        <h3 className="moviescard__title">{props.movie.nameRU}</h3>
        <p className="moviescard__movie-duration">{getTimeFromMins(props.movie.duration)}</p>
        {props.isSavedMovies ?
          (<button className="moviescard__button moviescard__button_type_delete"></button>) :
          (<button className="moviescard__button moviescard__button_type_like"></button>)}
      </div>
    </div>
  )
}