import { ContextUser } from "../contexts/CurrentUserContext";
import React from "react";
export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  const CurrentUserContext = React.useContext(ContextUser);
  const isOwn = card.owner._id === CurrentUserContext._id
  return (
    <li className="card">
      <img
        src={card.link}
        onClick={handleClick}
        className="card__image"
        alt={card.name}
      />
      {isOwn && <button type="reset" className="card__delete" id="delete"/> }
      <div className="card__container">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__heart-container">
          <button className="card__heart"></button>
          <p className="card__number-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
