import React from 'react';
import './AboutProject.css';

export default function AboutProject(props) {
	return (
		<section className="about-project">
			<h2 className="about-project__title">О проекте</h2>
			<div className="about-project__info">
				<h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
				<p className="about-project__info-description">
					Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
				</p>
			</div>
			<div className="about-project__info">
				<h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
				<p className="about-project__info-description">
					У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
				</p>
			</div>
			<div className="about-project__time">
				<div className="about-project__time-item">
					<p className="about-project__time-text about-project__time-text_color_black">1 неделя</p>
					<p className="about-project__time-text about-project__time-text_color_gray">Back-end</p>
				</div>
				<div className="about-project__time-item">
					<p className="about-project__time-text">4 недели</p>
					<p className="about-project__time-text about-project__time-text_color_gray">Front-end</p>
				</div>
			</div>
		</section>
	)
};