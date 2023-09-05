import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({onAddPlace, isOpen, onClose}) {
  
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    })
  }

  return(<PopupWithForm
    formName={"formAdd"}
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
    text={"Создать"}
    title={"Новое место"}
    name={"add"}
    buttonText={"Создать"}
    children={
      <>
        <input
          value={name || ''}
          onChange={handleChangeName}
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
          value={link || ''}
          onChange={handleChangeLink}
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
  />)
}