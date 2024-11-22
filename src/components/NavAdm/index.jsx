import './index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavAdm(props) {
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

        <nav className={`menu ${window.innerWidth > 912 ? 'visible' : 'hidden'}`}>
          <div className='links'>
            <Link to="/">Inicio</Link>
            <Link to="/Ferramentas">Ferramentas</Link>
            <Link to="/CadastrarVendas">Cadastrar Vendas</Link>
            <Link to="/GerenciarProdutos">Gerenciar Produtos</Link>
          </div>
        </nav>

        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      {isMenuOpen && window.innerWidth <= 912 && (
        <nav className="menu-mobile">
          <div className='links-mobile'>
            <Link to="/">Inicio</Link>
            <Link to="/Ferramentas">Ferramentas</Link>
            <Link to="/CadastrarVendas">Cadastrar Vendas</Link>
            <Link to="/GerenciarProdutos">Gerenciar Produtos</Link>
          </div>

        </nav>
      )}
    </header>
  );
}
