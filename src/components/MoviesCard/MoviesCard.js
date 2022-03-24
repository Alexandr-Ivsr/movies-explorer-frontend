import React from 'react';
import './MoviesCard.css';
import cardImage1 from '../../images/card-image1.jpg';

export default function MoviesCard(props) {
  return (
    <>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          {props.isSavedMovies ?
            (<button className="moviescard__button moviescard__button_type_delete"></button>) :
            (<button className="moviescard__button moviescard__button_type_like"></button>)}
        </div>
      </div>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          {props.isSavedMovies ?
            (<button className="moviescard__button moviescard__button_type_delete"></button>) :
            (<button className="moviescard__button moviescard__button_type_like moviescard__button_type_like_active"></button>)}
        </div>
      </div>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          {props.isSavedMovies ?
            (<button className="moviescard__button moviescard__button_type_delete"></button>) :
            (<button className="moviescard__button moviescard__button_type_like"></button>)}
        </div>
      </div>
    </>
  )
}