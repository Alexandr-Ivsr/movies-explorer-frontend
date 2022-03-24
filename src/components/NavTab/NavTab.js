import React from 'react';
import { Link } from "react-router-dom"
import './NavTab.css';

export default function NavTab(props) {
  return (
    <nav className="navtab">
      <a className="navtab__link" href="#about-project">О проекте</a>
      <a className="navtab__link" href="#technologies">Технологии</a>
      <a className="navtab__link" href="#about-student">Студент</a>
    </nav>
  )
};