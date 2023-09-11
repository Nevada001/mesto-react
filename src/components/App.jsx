import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { AppContext, CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
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
    setIsLoading(true);
    api
      .setUserInfo(currentUser.name, currentUser.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card)
      .then(() => {
        setCards((state) =>
          state.filter((newCard) => card._id !== newCard._id)
        );
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .changeUserAvatar(currentUser.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
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
    <AppContext.Provider value={isLoading}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Routes>
              <Route
                path="/sign-in"
                element={
                  <>
                    <Header />
                    <Login />
                  </>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <>
                    <Header />
                    <Register />
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      cards={cards.map((card) => (
                        <Card
                          card={card}
                          key={card._id}
                          onCardDelete={handleCardDelete}
                          onCardLike={handleCardLike}
                          onCardClick={handleCardClick}
                        />
                      ))}
                    />{" "}
                    <Footer />{" "}
                  </>
                }
              />

              <Route
                path="/"
                element={EditProfilePopup}
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
              />

              <Route
                path="/"
                element={AddPlacePopup}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
              />
              <Route
                path="/"
                element={EditAvatarPopup}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
              />
              <Route
                path="/"
                element={PopupWithForm}
                formName={"formDelete"}
                title={"Вы уверены?"}
                name={"delete"}
                buttonText={"Да"}
              />
              <Route
                path="/"
                element={ImagePopup}
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={selectedCard}
              />
            </Routes>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
