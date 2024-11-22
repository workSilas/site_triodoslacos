import './index.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavAdm from '../../../components/NavAdm';
import Rodape from '../../../components/Rodape';
import CardProdutoId from '../../../components/CardProdutoId';
import toast from 'react-hot-toast';
import { withMask } from 'use-mask-input';
import { useNavigate } from 'react-router-dom';


export default function CadastrarVendas() {

  useEffect(() => {
    document.title = 'Trio Dos Laços | Cadastrar Vendas';
  }, []);

  // Validação ADM

  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem('USUARIO')
    setToken(token)

    if (token == null) {
      navigate("/")
    }
  }, [])


  //Cadastrar uma Venda
  const [idUsuario, setIdUsuario] = useState(0)
  const [idProduto, setIdProduto] = useState(0)
  const [quantidade, setQuantidade] = useState(0)
  const [data, setData] = useState('')
  const [endereco, setEndereco] = useState('')
  const [total, setTotal] = useState(0)
  const [qtdEstoque, setQtdEstoque] = useState(0)

  // setta o total

  async function buscar() {
    if (idProduto <= 0) {
      return;
    }
    let url = `http://4.172.207.208:5018/tdl/produtos/consultaId/${idProduto}`;
    try {
      let produtos = await axios.post(url);
      setTotal(produtos.data[0].valor * quantidade);
      setQtdEstoque(produtos.data[0].quantidade);
      console.log(qtdEstoque);

    }
    catch (error) {
      return
    }
  }

  useEffect(() => {
    buscar();
  }, [idProduto, quantidade]);

  async function cadastrarVenda() {

    let dataFormatada = data.replace(/\//g, "-").split('-').reverse().join('-')

    const url = `http://4.172.207.208:5018/tdl/vendas/inserir/`
    const paramCorpo = {
      "idProduto": idProduto,
      "idUsuario": idUsuario,
      "quantidade": quantidade,
      "total": total,
      "data": dataFormatada,
      "endereco": endereco
    }

    if (endereco.length > 50) {
      toast.error("Endereço contém caractéres demais.", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      })
      return
    }

    if (quantidade > qtdEstoque) {
      toast.error("Estoque insuficiente.", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      })
      return
    }

    try {
      let resp = await axios.post(url, paramCorpo)
      toast.success("Venda adicionada com sucesso!", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#1EFF00',
          secondary: '#FFFAEE',
        },
      })
      setIdProduto(0)
      setIdUsuario(0)
      setQuantidade(0)
      setTotal(0)
      setData('')
      setEndereco('')
      conferirTodasAsVendas()
    }
    catch (error) {
      toast.error("Erro ao adicionar venda. Verifique as informações.", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFAEE',
        },
      })
      return
    }

  }

  //Exibir Tabela com TODAS as Vendas

  const [venda, setVenda] = useState([])

  useEffect(() => {
    conferirTodasAsVendas()
  }, [])

  async function recarregar() {
    await finalizarVenda()
    await conferirTodasAsVendas()
  }

  async function conferirTodasAsVendas() {
    const url = `http://4.172.207.208:5018/tdl/vendas/consultaTodas/`
    let resp = await axios.get(url)

    if (resp.data.erro !== undefined) {
      alert(resp.data.erro)
    }
    else {
      setVenda(resp.data)
    }
  }

  useEffect(() => {
    conferirTodasAsVendas()
  }, [])

  //Finalizar Venda (Marcar como Enviada)

  const [idVenda, setIdVenda] = useState(0)

  async function finalizarVenda() {

    try {
      const url = `http://4.172.207.208:5018/tdl/vendas/alterar/${idVenda}`
      let resp = await axios.put(url)
      toast.success("Venda finalizada!.", {
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
      })
      return
    }
  }


  // Encomendas

  const [encomenda, setEncomenda] = useState([])

  async function buscarEncomendas() {
    let url = "http://4.172.207.208:5018/tdl/encomendas/consulta/"
    let resp = await axios.get(url)
    setEncomenda(resp.data)
  }

  useEffect(() => {
    buscarEncomendas()
  }, [])

  return (
    <div className="CadastrarVendas">
      <NavAdm
        titulo="Cadastrar Vendas"
      />

      <div className="sessaoCompleta">
        <div className="sessaoQuadrado">

          <div className="conversao">
            <div className="alinhamento">
              <h1>Cadastre uma venda</h1>
              <p>Data</p>
              <input type="text" placeholder='00/00/0000' ref={withMask("99/99/9999")} value={data} onChange={a => setData(a.target.value)} />
              <p>Endereço</p>
              <input type="text" placeholder='Ex: Parque Cocaia' value={endereco} onChange={a => setEndereco(a.target.value)} />
              <p>Quantidade</p>
              <input type="text" placeholder='Ex: 1' value={quantidade} onChange={a => setQuantidade(a.target.value)} />
              <p>Id do atendente</p>
              <input type="text" placeholder='Ex: 1' value={idUsuario} onChange={a => setIdUsuario(a.target.value)} />
            </div>
            <div className="alinhamento">
              <p>ID do produto</p>
              <input type="text" placeholder='0' value={idProduto} onChange={e => setIdProduto(e.target.value)} />
              <p>Total: R${total}</p>
              <CardProdutoId
                id={idProduto}
              />
            </div>
          </div>
          <button onClick={cadastrarVenda}>CADASTRAR</button>
        </div>
      </div>

      <div id='invertido' className="sessaoTabela">
        <h2>Vendas Feitas</h2>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendedor</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Data</th>
                <th>Endereço</th>
                <th>Enviado</th>
              </tr>
            </thead>

            <tbody>
              {venda.map(item => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.usuario_nome.length > 9 ? item.usuario_nome.substr(0, 9) + "." : item.usuario_nome}</td>
                  <td>{item.produto_nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.total}</td>
                  <td>{new Date(item.data).toLocaleDateString()}</td>
                  <td>{item.endereco.length > 20 ? item.endereco.substr(0, 9) + "." : item.endereco}</td>
                  <td>{item.enviado ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="alinharBotoes">
          <div className="textoInput">
            <p>Id da venda finalizada</p>
            <input type="text" placeholder='ID da venda finalizada' value={idVenda} onChange={a => setIdVenda(a.target.value)} />
          </div>
          <button onClick={recarregar}>FINALIZAR</button>
        </div>
      </div>

      <div className="sessaoTabela">
        <h2>Encomendas</h2>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrião</th>
              </tr>
            </thead>

            <tbody>
              {encomenda.map(item => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Rodape />
    </div>
  );
}
