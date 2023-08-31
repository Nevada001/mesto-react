import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { Context } from "../contexts/CurrentUserContext";
import React from "react";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [cards, setCards] = useState([]);
  const CurrentUserContext = React.useContext(Context);
  console.log(CurrentUserContext)
  

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }, []);

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
            <Card card={card} key={card._id} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
