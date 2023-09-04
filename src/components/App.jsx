import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { ContextUser } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
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
  }, []);

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
    <ContextUser.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            formName={"formAdd"}
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            text={"Создать"}
            title={"Новое место"}
            name={"add"}
            buttonText={"Создать"}
            children={
              <>
                <input
                  className="popup__input"
                  minLength="2"
                  maxLength="30"
                  placeholder="Название"
                  type="text"
                  name="input"
                  id="placeName"
                  required
                />
                <span className="error placeName-error"></span>
                <input
                  className="popup__input"
                  type="url"
                  placeholder="Ссылка на картинку"
                  name="input"
                  id="link"
                  required
                />
                <span className="error link-error"></span>
              </>
            }
          />
          <PopupWithForm
            formName={"formAvatar"}
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            title={"Обновить Аватар"}
            name={"avatar-edit"}
            buttonText={"Обновить"}
            children={
              <>
                <input
                  className="popup__input"
                  type="url"
                  placeholder="Ссылка на картинку"
                  name="input"
                  id="avatarLink"
                  required
                />
                <span className="error avatarLink-error"></span>
              </>
            }
          />
          <PopupWithForm
            formName={"formDelete"}
            title={"Вы уверены?"}
            name={"delete"}
            buttonText={"Да"}
            children={<></>}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={selectedCard}
          />
        </div>
      </div>
    </ContextUser.Provider>
  );
}

export default App;
