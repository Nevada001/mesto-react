


export default function Register() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="login">
      <form className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <input
          className="login__input"
          placeholder='E-mail'
        />
        <input
          type="password"
          className="login__input"
          placeholder='Пароль'
        />
        <button type="submit" className="login__button">
        Зарегистрироваться
        </button>
        <p className="login__caption">Уже зарегистрированы? Войти</p>
      </form>
    </div>
  );
}
