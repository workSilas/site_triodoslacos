import './index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CardProdutoId(props) {
  const [produtoEncontrado, setProdutoEncontrado] = useState([]);

  async function buscar() {
    if (props.id <= 0) {
      return;
    }
    let url = `http://4.172.207.208:5018/tdl/produtos/consultaId/${props.id}`;
    try {
      let produtos = await axios.post(url);
      setProdutoEncontrado(produtos.data);
    }
    catch (error) {
      toast.error("ID inexistente.", {
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
      return
    }
  }

  useEffect(() => {
    buscar();
  }, [props.id]);

  return (
    <div className="CardProdutoId">
      {produtoEncontrado.length > 0 ? (
        produtoEncontrado?.map(item => (
          <div className="card" key={item.id}>
            <div id='imagem' className="separacaoInfo">
              <img src={item.imagem} alt="produto" />
            </div>
            <div className="separacaoInfo">
              <p>#{item.id}</p>
              <h5>{item.nome.length > 15 ? item.nome.substr(0, 15) + "..." : item.nome}</h5>
              <h5>R${item.valor.toFixed(2)}</h5>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum produto selecionado</p>
      )}
    </div>
  );
}
