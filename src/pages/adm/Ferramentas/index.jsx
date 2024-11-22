import './index.scss';
import NavAdm from '../../../components/NavAdm';
import Rodape from '../../../components/Rodape';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Ferramentas() {

  useEffect(() => {
    document.title = 'Trio Dos Laços | Ferramentas';
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

  // VENDAS

  const [vendasTotais, setVendasTotais] = useState([])
  const [vendasTotaisValor, setVendasTotaisValor] = useState([])

  async function buscarVendas() {
    const url = "http://4.172.207.208:5018/tdl/vendas/consulta/"
    let vendas = await axios.get(url)
    setVendasTotais(vendas.data)
  }

  async function buscarVendasValor() {
    const url = "http://4.172.207.208:5018/tdl/vendas/consultaTotal/"
    let vendasTotal = await axios.get(url)
    setVendasTotaisValor(vendasTotal.data)
  }

  // SESSÃO

  const [vendasSessao, setVendasSessao] = useState([])
  const [vendasTotaisSessao, setVendasTotaisSessao] = useState([])

  const [sessaoSelecionada, setSessaoSelecionada] = useState("")

  async function buscarVendasSessao() {
    const url = `http://4.172.207.208:5018/tdl/vendas/consultaSessao/${sessaoSelecionada}`
    let vendaSessao = await axios.post(url)
    setVendasSessao(vendaSessao.data)
  }

  async function buscarVendasSessaoTotal() {
    const url = `http://4.172.207.208:5018/tdl/vendas/consultaSessaoTotal/${sessaoSelecionada}`
    let vendasTotalSessao = await axios.post(url)
    setVendasTotaisSessao(vendasTotalSessao.data)
  }
  async function botaoSessao() {

    if (sessaoSelecionada == "" || sessaoSelecionada == "SELECIONAR"){
      toast.error("Selecione uma sessão.", {
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

    toast.success(`Dados da ${sessaoSelecionada} encontrados!`, {
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
    await buscarVendasSessao()
    await buscarVendasSessaoTotal()
  }

  // ESTOQUE

  const [estoque, setEstoque] = useState([])
  const [semEstoque, setSemEstoque] = useState([])

  async function buscarEstoque() {
    const url = "http://4.172.207.208:5018/tdl/produtos/estoque/"
    let estoqueTotal = await axios.get(url)
    setEstoque(estoqueTotal.data)
  }

  async function buscarSemEstoque() {
    const url = "http://4.172.207.208:5018/tdl/produtos/semEstoque/"
    let semEstoqueTotal = await axios.get(url)
    setSemEstoque(semEstoqueTotal.data)
  }

  useEffect(() => {
    buscarSemEstoque()
    buscarEstoque()
    buscarVendas()
    buscarVendasValor()
  }, [])


  return (
    <div className="Ferramentas">
      <NavAdm
        titulo="Ferramentas"
      />

      <div className="sessaoNavegacaoRapida">

        <h1>Estatísticas de Vendas</h1>

        <div className="alinharNavegacao">
          <a href="#vendas">VENDAS</a>
          <a href="#sessao">SESSÃO</a>
          <a href="#estoque">ESTOQUE</a>

        </div>
      </div>

      <div id='vendas' className="sessaoTabela">
        <h2>Confira todas as vendas</h2>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Data</th>
                <th>Endereco</th>
                <th>Enviado</th>
              </tr>
            </thead>

            <tbody>
              {vendasTotais.map(item =>
                <tr>
                  <td>{item.usuario_nome.length > 9 ? item.usuario_nome.substr(0, 9) + "." : item.usuario_nome}</td>
                  <td>{item.produto_nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.total.toFixed(2).replace(".", ",")}</td>
                  <td>{new Date(item.data).toLocaleDateString()}</td>
                  <td>{item.endereco.length > 20 ? item.endereco.substr(0, 9) + "." : item.endereco}</td>
                  <td>{item.enviado ? 'Sim' : 'Não'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="informacao">
          {vendasTotaisValor.map(item =>
            <h2>Total vendido: R${String(item.Total.toFixed(2)).replace(".", ",")}</h2>
          )}
        </div>
      </div>

      <div id='sessao' className="sessaoTabela">
        <h2>Vendas por sessão</h2>

        <div className="inputsCheck">
          <select name="sessoes" id="sessoes" onChange={e => setSessaoSelecionada(e.target.value)}>
            <option >SELECIONAR</option>
            <option value="Faixas de Bebê">Faixas de bebe</option>
            <option value="Laços Estampados">Laços estampados</option>
            <option value="Kits de Laços">Kits de laços</option>
            <option value="Laços Decorados">Laços decorados</option>
          </select>
          <button onClick={botaoSessao}>BUSCAR</button>
        </div>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Data</th>
                <th>Endereco</th>
                <th>Enviado</th>
              </tr>
            </thead>

            <tbody>
              {vendasSessao.map(item =>
                <tr>
                  <td>{item.usuario_nome.length > 9 ? item.usuario_nome.substr(0, 9) + "." : item.usuario_nome}</td>
                  <td>{item.produto_nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.total.toFixed(2).replace(".", ",")}</td>
                  <td>{new Date(item.data).toLocaleDateString()}</td>
                  <td>{item.endereco.length > 20 ? item.endereco.substr(0, 9) + "." : item.endereco}</td>
                  <td>{item.enviado ? 'Sim' : 'Não'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="informacao">
          {vendasTotaisSessao.map(item =>
            <h2>Total vendido na sessão {sessaoSelecionada}: R${String(item.Total.toFixed(2)).replace(".", ",")}</h2>
          )}
        </div>
      </div>

      <div id='estoque' className="sessaoTabela">
        <h2>Estoque dos produtos</h2>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>

            <tbody>
              {estoque.map(item =>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <div id='semEstoque' className="sessaoTabela">
        <h2>Produtos sem estoque</h2>

        <div className="tabelaScroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>

            <tbody>
              {semEstoque.map(item =>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Rodape />
    </div>
  );
}