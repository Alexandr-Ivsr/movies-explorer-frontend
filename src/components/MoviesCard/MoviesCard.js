import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import getTimeFromMins from '../../utils/getTimeFromMins';

export default function MoviesCard({ movie, isSavedMovies, onBtnMovieClick, savedMovies }) {
  const [isLikedBtn, setIsLikedBtn] = useState(false);

  useEffect(() => {
    if (savedMovies?.length > 0) {
      setIsLikedBtn(savedMovies.some(el => el.movieId === movie.id));
    } else {
      setIsLikedBtn(false);
    }
  }, [savedMovies])

  const handleClick = (evt) => {
    evt.preventDefault();
    onBtnMovieClick({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink ? movie.trailerLink : 'https://www.youtube.com',
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN ? movie.nameEN : 'unknown',
    })
  }

  const handleDelete = (evt) => {
    evt.preventDefault();
    onBtnMovieClick(movie._id);
  }

  return (
    <a href={movie.trailerLink} className="moviescard" target="_blank" rel="noreferrer">
      <img className="moviescard__movie-image"
        src={isSavedMovies ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
        alt="мини-иллюстрация к фильму" />
      <div className="moviescard__wrapper">
        <h3 className="moviescard__title">{movie.nameRU}</h3>
        <p className="moviescard__movie-duration">{getTimeFromMins(movie.duration)}</p>
        {isSavedMovies ? (
          <button className="moviescard__button moviescard__button_type_delete" onClick={handleDelete}></button>
          ) : (
            <button
              className={`moviescard__button ${isLikedBtn ? 'moviescard__button_type_like_active' : 'moviescard__button_type_like'}`}
              onClick={handleClick}>
            </button>
          )
        }
      </div>
    </a>
  )
}