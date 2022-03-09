import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

export default function Main(props) {
  return (
    <>
      <Header isMainPage={true} />
      <section className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </section>
    </>
  )
};