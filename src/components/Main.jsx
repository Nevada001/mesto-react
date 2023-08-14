import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
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
            src={userAvatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            className="profile__button-edit"
          ></button>
          <p className="profile__info-text">{userDescription}</p>
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
