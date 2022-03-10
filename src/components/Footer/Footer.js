import React from 'react';
import './Footer.css';

export default function Footer(props) {
	return (
		<footer className="footer">
			<p className="footer__sign">Учебный проект Яндекс.Практикум х BeatFilm.</p>
			<div className="footer__wrapper">
				<div className="footer__links">
					<a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
					<a className="footer__link" href="https://github.com/">Github</a>
					<a className="footer__link" href="https://www.facebook.com/">Facebook</a>
				</div>
				<p className="footer__copyright">©{new Date().getFullYear()}</p>
			</div>
		</footer>
	)
};