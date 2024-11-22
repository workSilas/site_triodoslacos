import './index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function BotaoAdm() {

  const [token, setToken] = useState(true)

  useEffect(() => {
    let token = localStorage.getItem('USUARIO')
    setToken(!!token)

    if (token == null) {
      setToken(false)
    }
  }, [])


  return (
    <div className="BotaoAdm">
      {token == true &&
        <Link to={"/Ferramentas"}>
          <div className="botao">
            <img src="/assets/images/engrenagem.png" alt="engrenagem" />
          </div>
        </Link>
      }
    </div>
  );
}