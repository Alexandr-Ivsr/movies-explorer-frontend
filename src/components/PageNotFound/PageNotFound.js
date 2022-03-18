import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleBackPreviousRoute = () => {
    navigate(-1);
  }

  return (
    <section className="pagenotfound">
      <div className="pagenotfound__message">
        <h2 className="pagenotfound__message-title">404</h2>
        <p className="pagenotfound__message-text">Страница не найдена</p>
      </div>
      <button className="pagenotfound__button-return" onClick={handleBackPreviousRoute}>Назад</button>
    </section>
  )
}