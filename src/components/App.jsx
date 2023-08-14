import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
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
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          formName={"formEdit"}
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          title={"Редактировать профиль"}
          buttonText={"Сохранить"}
          name={"edit"}
          children={
            <>
              <input
                className="popup__input"
                minLength="2"
                maxLength="40"
                placeholder="Имя"
                type="text"
                name="input"
                id="userName"
                required
              />
              <span className="error userName-error"></span>
              <input
                className="popup__input"
                minLength="2"
                maxLength="200"
                placeholder="Вид деятельности"
                type="text"
                name="input"
                id="userInfo"
                required
              />
              <span className="error userInfo-error"></span>
            </>
          }
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
  );
}

export default App;
