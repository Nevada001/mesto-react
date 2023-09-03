
import Card from "./Card";
import {  ContextUser } from "../contexts/CurrentUserContext";

import React from "react";

export default function Main({
  onCardDelete,
  onCardLike,
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  console.log(cards)
  const CurrentUserContext = React.useContext(ContextUser);
  
  
  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          onClick={onEditAvatar}
          className="profile__buttonAvatar"
        >
          <img
            className="profile__avatar"
            alt="Аватар профиля"
            src={CurrentUserContext.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{CurrentUserContext.name}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            className="profile__button-edit"
          ></button>
          <p className="profile__info-text">{CurrentUserContext.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__button-add"
        ></button>
      </section>
      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
