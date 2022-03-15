import React from 'react';
import './MoviesCard.css';
import cardImage1 from '../../images/card-image1.jpg';
// import likeImage from '../../images/like-button-image.svg';

export default function MoviesCard(props) {
  return (
    <>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          <button className="moviescard__like-button"></button>
        </div>
      </div>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          <button className="moviescard__like-button"></button>
        </div>
      </div>
      <div className="moviescard">
        <img className="moviescard__movie-image" src={cardImage1} alt="мини-иллюстрация к фильму" />
        <div className="moviescard__wrapper">
          <h3 className="moviescard__title">33 слова о дизайне</h3>
          <p className="moviescard__movie-duration">1ч 42м</p>
          <button className="moviescard__like-button"></button>
        </div>
      </div>
    </>
  )
}