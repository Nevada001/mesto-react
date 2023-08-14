export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="reset"
          className="popup__closed"
          id="editclose"
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name="form"
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}
