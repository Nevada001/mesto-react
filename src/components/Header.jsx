import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/headerLogo.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип проекта" />
      <Routes>
        <Route
          path="sign-up"
          element={<Link to='../sign-in' className="header__caption">Войти</Link>}
        />
        <Route
          path="sign-in"
          element={<Link to='../sign-up' className="header__caption">Регистрация</Link>}
        />
      </Routes>
    </header>
  );
}
