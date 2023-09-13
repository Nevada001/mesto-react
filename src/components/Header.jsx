import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/headerLogo.svg";
import { useContext } from "react";
import { CurrentEmailContext } from "../contexts/CurrentUserContext";



export default function Header({email}) {
  const currentUserEmail = useContext(CurrentEmailContext)
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип проекта" />
      <p className="header__caption">{email}</p>
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
