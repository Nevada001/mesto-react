import headerLogo from '../images/headerLogo.svg';

export default function Header() {
  return (
    <header className='header'>
        <img className="header__logo" src={headerLogo} alt="Логотип проекта"/>
    </header>
  )
}

