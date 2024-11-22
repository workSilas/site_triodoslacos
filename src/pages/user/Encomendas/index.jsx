import './index.scss';
import Nav from '../../../components/Nav';
import Rodape from '../../../components/Rodape';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Encomendas() {

  useEffect(() => {
    document.title = 'Trio Dos Laços | Encomendas';
  }, []);

  const [encomenda, setEncomenda] = useState("");
  const [obrigatorio, setObrigatorio] = useState("")

  async function enviarEncomenda() {
    const url = `http://4.172.207.208:5018/tdl/encomendas/inserir/`;
    const valores = {
      "descricao": encomenda,
      "imagem": null
    };

    if (encomenda.length > 250) {
      toast.error("Texto contém caractéres demais(máx:250).", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      setObrigatorio("")
      return;
    }

    if (encomenda.length <= 0) {
      toast.error("Insira a descrição", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      });

      setObrigatorio("*Obrigatório")
      return;
    }

    if (encomenda.length <= 20) {
      toast.error("O mínimo de caractéres para fazer uma encomenda é de 20.", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      });
      setObrigatorio("")
      return;
    }


    try {
      let resp = await axios.post(url, valores);
      toast.success(`Encomenda feita! ID: ${resp.data.novoId}`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#1EFF00',
          secondary: '#FFFAEE',
        },
      });
      setObrigatorio("")
    }
    catch (error) {
      toast.error("ERRO", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      });
      return;
    }
    setEncomenda("");
  }

  return (
    <div className="Encomendas">
      <Nav titulo="Encomendas" />

      <div className="sessaoInicialEncomendas">
        <h2>Encomende aqui o seu laço, use da sua <br />
          criatividade e imaginação, para vestir seu <br />
          bebe com conforto e estilo! </h2>
      </div>

      <div className="sessaoExemplos">
        <h1>Exemplos de pedidos</h1>

        <div className="alinharExemplos">
          <div className="cardsExemplos">
            <img src="assets/images/Pelucia.png" alt="Pelúcia" />
          </div>
          <div className="cardsExemplos">
            <img src="assets/images/LaçoPreto.png" alt="laço Preto" />
          </div>
          <div className="cardsExemplos">
            <img src="assets/images/LaçoAzul.png" alt="Laço Azul" />
          </div>
        </div>
      </div>

      <div className="sessaoIncentivo">
        <p>Agora é com você use da sua <br />
          imaginação para criar um laço <br />
          perfeito para você</p>
        <img src="/assets/images/laçoVetorzado.png" alt="Laço" />
      </div>

      <div className="sessaoInpuntsEncomenda">
        <div className="alinhamento">
          <div className="alinharInputs">
            <p>Descreva brevemente o que deseja:</p>
            <textarea
              type="text"
              placeholder='Descrição'
              value={encomenda}
              onChange={e => setEncomenda(e.target.value)}
            />
            <p className='obrigatorio' >{obrigatorio}</p>
          </div>
        </div>
        {encomenda.length < 20 ?
          <button onClick={enviarEncomenda} >ENVIAR</button>
          : <Link onClick={enviarEncomenda} target='_blank'
            to={`https://wa.me/5511977798407?text=
${encomenda}`}>ENVIAR</Link>}
      </div>

      <Rodape />
    </div>
  );
}