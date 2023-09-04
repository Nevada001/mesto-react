export default function PopupWithForm({
  onSubmit,
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  formName
}) {
  return (
    <div  className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="reset"
          className="popup__closed"
          id="editclose"
        ></button>
        <form
        onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name={formName}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
                type="submit"
                className="popup__button"
                id="buttonCreateDelete"
                
              >{buttonText}
              </button>
        </form>
      </div>
    </div>
  );
}
