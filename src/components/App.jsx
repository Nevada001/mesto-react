import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })

      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })

      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }, [] );

  function handleUpdateUser(currentUser) {
    api.setUserInfo(currentUser.name, currentUser.about)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Sorry, ${err}`);
    });
  }

  function handleCardDelete(card) {
    api.removeCard(card).then(() => {
      setCards((state) => state.filter((newCard) => card._id !== newCard._id));
    })
    .catch((err) => {
      console.log(`Sorry, ${err}`);
    });
  }

  function handleUpdateAvatar(currentUser) {
    api.changeUserAvatar(currentUser.avatar) 
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Sorry, ${err}`);
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(`Sorry, ${err}`);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Sorry, ${err}`);
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards.map((card) => (
              <Card card={card} key={card._id} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick}  />
            ))}
          />
          <Footer />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
          />
          <PopupWithForm
            formName={"formDelete"}
            title={"Вы уверены?"}
            name={"delete"}
            buttonText={"Да"}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
