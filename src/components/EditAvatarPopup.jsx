
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef('')
  
  
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }
  
  return (
    <PopupWithForm
      formName={"formAvatar"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title={"Обновить Аватар"}
      name={"avatar-edit"}
      buttonText={"Обновить"}
      children={
        <>
          <input
            className="popup__input"
            type="url"
            ref={avatarRef}
            placeholder="Ссылка на картинку"
            name="input"
            id="avatarLink"
            required
          />
          <span className="error avatarLink-error"></span>
        </>
      }
    />
  );
}
