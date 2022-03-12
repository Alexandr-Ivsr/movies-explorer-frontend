import React from 'react';
import './AboutMe.css';
import imageUser from '../../images/cat.webp';

export default function AboutMe(props) {
	return (
		<section className="about-me">
			<h2 className="about-me__title">Студент</h2>
			<div className="about-me__wrapper">
				<img src={imageUser} className="about-me__photo" alt="мое фото" />
				<div className="about-me__info">
          <div className="about-me__info-wrapper">
            <h3 className="about-me__subtitle">Александр</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 26 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <div className="about-me__links" >
            <a className="about-me__link" href="https://ru-ru.facebook.com/">Facebook</a>
            <a className="about-me__link" href="https://github.com/Alexandr-Ivsr">Github</a>
          </div>
				</div>
			</div>
		</section>
	)
};