import './index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='Nav'>
      <div className='itens'>
        <img src="/assets/images/LogoOficial.png" alt="logo" className='logo' />

        <div className="divisaoComponentesNav">
          <h1>{props.titulo}</h1>
        </div>

        <nav className={`menu ${window.innerWidth > 768 ? 'visible' : 'hidden'}`}>
          <div className='links'>
            <Link to="/">Início</Link>
            <Link to="/Encomendas">Encomendas</Link>
            <Link to="/CatalogoLacosDecorados">Catálogo</Link>
          </div>
        </nav>

        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      {isMenuOpen && window.innerWidth <= 768 && (
        <nav className="menu-mobile">
          <div className='links-mobile'>
            <Link to="/">Início</Link>
            <Link to="/Encomendas">Encomendas</Link>
            <Link to="/CatalogoLacosDecorados">Catálogo</Link>
          </div>

        </nav>
      )}
    </header>
  );
}
