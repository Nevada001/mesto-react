import confirmImage from '../images/Confirm.svg'

export default function InfoTooltip({isOpen}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button  type="reset" className="popup__closed" />
        <img className='popup__image' src={confirmImage} alt="" />
        <p className='popup__caption'>Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}
