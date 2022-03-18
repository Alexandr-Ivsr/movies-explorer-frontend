import React from 'react';
import './Portfolio.css';

export default function Portfolio(props) {
	return (
		<section className="portfolio">
			<h2 className="portfolio__title">Портфолио</h2>
			<div className="portfolio__links">
				<a className="portfolio__link" href="https://github.com/Alexandr-Ivsr/how-to-learn" rel="noreferrer" target="_blank">
					Статичный сайт
					<span className="portfolio__symbol-arrow">↗</span>
				</a>
				<a className="portfolio__link" href="https://alexandr-ivsr.github.io/russian-travel/" rel="noreferrer" target="_blank">
					Адаптивный сайт
					<span className="portfolio__symbol-arrow">↗</span>
				</a>
				<a className="portfolio__link" href="https://project.mesto.nomoredomains.work/" rel="noreferrer" target="_blank">
					Одностраничное приложение
					<span className="portfolio__symbol-arrow">↗</span>
				</a>
			</div>
		</section >
	)
}