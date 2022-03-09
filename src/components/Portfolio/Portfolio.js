import React from 'react';
import './Portfolio.css';

export default function Portfolio(props) {
	return (
		<section className="portfolio">
			<h2>Портфолио</h2>
			<ul>
				<li>Статичный сайт</li>
				<li>Адаптивный сайт</li>
				<li>Одностраничное приложение</li>
			</ul>
		</section>
	)
}