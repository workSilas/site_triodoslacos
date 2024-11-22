import './index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function BotaoCatalogo() {

  const [token, setToken] = useState(true)

  useEffect(() => {
    let token = localStorage.getItem('USUARIO')
    setToken(!!token)

    if (token == null) {
      setToken(false)
    }
  }, [])


  return (
    <div className="BotaoCatalogo">
      {token == true &&
        <Link target='_blank' to={"/CatalogoLacosDecorados"}>
          <div className="botao">
            <img src="/assets/images/Olho.png" alt="engrenagem" />
            <p>Ir para o catálogo</p>
          </div>
        </Link>
      }
    </div>
  );
}