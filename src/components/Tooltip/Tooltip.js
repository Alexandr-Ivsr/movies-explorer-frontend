import React from 'react';
import './Tooltip.css';
import ButtonClose from '../../images/button-close.svg';
import IconTooltip from '../../images/tooltip-icon-label.svg';

export default function Tooltip(props) {

  const handleSetIsTooltipOpen = () => {
    props.setIsTooltipOpen(false);
  }

  return (
    <article className={`tooltip ${props.isTooltipOpen ? 'tooltip_opened' : ''}`}>
      <div className="tooltip__container">
        <img className="tooltip__icon" src={IconTooltip} alt="иконка уведомления" />
        <p className="tooltip__message">Данные успешно отредактированы!</p>
        <button className="tooltip__button">
          <img className="tooltip__button-image" onClick={handleSetIsTooltipOpen} src={ButtonClose} alt="иконка закрытия" />
        </button>
      </div>
    </article>
  )
}