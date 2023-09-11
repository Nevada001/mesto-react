export default function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="login login_type_login">
      <form className="login__form">
        <h2 className="login__title">Вход</h2>
        <input
          className="login__input"
          placeholder="E-mail"
        />
        <input
          type="password"
          className="login__input"
          placeholder='Пароль'
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
