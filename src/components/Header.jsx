import { Route, Routes } from "react-router-dom";
import headerLogo from "../images/headerLogo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип проекта" />
      <Routes>
        <Route
          path="sign-up"
          element={<p className="header__caption">Регистрация</p>}
        />
        <Route
          path="sign-in"
          element={<p className="header__caption">Войти</p>}
        />
      </Routes>
    </header>
  );
}
