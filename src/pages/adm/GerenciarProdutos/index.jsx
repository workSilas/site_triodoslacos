import './index.scss';
import NavAdm from '../../../components/NavAdm';
import Rodape from '../../../components/Rodape';
import CardProdutoTemplate from '../../../components/CardProdutoTemplate';
import CardProdutoId from '../../../components/CardProdutoId';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { withMask } from 'use-mask-input';
import BotaoCatalogo from '../../../components/BotaoCatalogo';


export default function GerenciarProdutos() {

  useEffect(() => {
    document.title = 'Trio Dos Laços | Gerenciar Produtos';
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


  const [sessaoSelecionada, setSessaoSelecionada] = useState("")
  const [imagem, setImagem] = useState("")
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState(null)
  const [quantidade, setQuantidade] = useState(0)
  const [descricao, setDescricao] = useState("")

  function enviarImagem(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }


  async function inserirProduto() {

    if (sessaoSelecionada == "" || sessaoSelecionada == "SELECIONAR") {
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

    if (nome.length > 30) {
      toast.error("Defina um nome menor ao produto.", {
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
    if (quantidade > 999) {
      toast.error("O limite de estoque é de 999 produtos.", {
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
    if (descricao.length > 250) {
      toast.error("Descrição muit longa.", {
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
    if (sessaoSelecionada == undefined || sessaoSelecionada == null) {
      toast.error("Defina a sessão.", {
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
    if (imagem == undefined || imagem == null) {
      toast.error("Defina uma imagem.", {
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
      let valores = {
        "nome": nome,
        "valor": valor.replace(",", "."),
        "quantidade": quantidade,
        "descricao": descricao,
        "sessao": sessaoSelecionada,
        "imagem": imagem
      }

      let url = "http://4.172.207.208:5018/tdl/produtos/inserir/"
      let prod = await axios.post(url, valores)
      toast.success(`Novo produto adicionado ao catálogo com sucesso! ID${prod.data.novoId}`, {
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

      setSessaoSelecionada("")
      setImagem("")
      setNome("")
      setValor()
      setQuantidade(0)
      setDescricao("")
    }
    catch (error) {
      toast.error("Erro ao adicionar o produto! Verifique as informações.", {
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
    }
  }

  // Alterar

  const [idProduto, setIdProduto] = useState("")
  const [sessaoSelecionadaAlterar, setSessaoSelecionadaAlterar] = useState("")
  const [alterarImagem, setAlterarImagem] = useState("")
  const [alterarNome, setAlterarNome] = useState("")
  const [alterarValor, setAlterarValor] = useState(null)
  const [alterarQuantidade, setAlterarQuantidade] = useState(0)
  const [alterarDescricao, setAlterarDescricao] = useState("")

  function alterarImagemBase(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAlterarImagem(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }


  async function alterarProduto() {

    if (sessaoSelecionadaAlterar == "" || sessaoSelecionadaAlterar == "SELECIONAR") {
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

    if (alterarNome > 30) {
      toast.error("Defina um nome menor ao produto.", {
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
    if (alterarQuantidade > 999) {
      toast.error("O limite de estoque é de 999 produtos.", {
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
    if (alterarDescricao > 250) {
      toast.error("Descrição muito longa.", {
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
    if (sessaoSelecionadaAlterar == undefined || sessaoSelecionadaAlterar == null) {
      toast.error("Defina a sessão.", {
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
    if (alterarImagem == undefined || alterarImagem == null) {
      toast.error("Defina uma imagem.", {
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
      let valores = {
        "nome": alterarNome,
        "valor": alterarValor.replace(",", "."),
        "quantidade": alterarQuantidade,
        "descricao": alterarDescricao,
        "sessao": sessaoSelecionadaAlterar,
        "imagem": alterarImagem
      }

      let url = `http://4.172.207.208:5018/tdl/produtos/alterar/${idProduto}`
      let prod = await axios.put(url, valores)
      toast.success(`Novo produto alterado no catálogo com sucesso!`, {
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

      setSessaoSelecionadaAlterar("")
      setImagem("")
      setNome("")
      setValor(null)
      setQuantidade(0)
      setDescricao("")
      setImagem("")
    }
    catch (error) {
      toast.error("Erro ao alterar o produto! Verifique as informações.", {
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
    }
  }

  // Deletar Produto

  async function deletarProduto() {
    try {
      let url = `http://4.172.207.208:5018/tdl/produtos/delete/${idProduto}`
      let resp = await axios.delete(url)
      setIdProduto(0)
      toast.success("Produto Deletado com sucesso!", {
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
    }
    catch (error) {
      toast.error("Produto não encotnrado.", {
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
    }
  }


  return (
    <div className="GerenciarProdutos">
      <NavAdm
        titulo="Gerenciar Produtos"
      />
      <BotaoCatalogo />

      <div className="sessaoCompleta">
        <div className="sessaoQuadrado">
          <div className="conversao">
            <div className="alinhamento">
              <h1>Cadastre um produto</h1>
              <select name="sessoes" id="sessoes" onChange={e => setSessaoSelecionada(e.target.value)}>
                <option>SELECIONAR</option>
                <option value="Faixas de Bebê">Faixas de bebe</option>
                <option value="Laços Estampados">Laços estampados</option>
                <option value="Kits de Laços">Kits de laços</option>
                <option value="Laços Decorados">Laços decorados</option>
              </select>
              <p>Nome</p>
              <input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)} />
              <p>Valor</p>
              <input type="text" placeholder='99,99' ref={withMask("99,99")} value={valor} onChange={e => setValor(e.target.value)} />
              <p>Quantidade</p>
              <input type="text" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
              <p>Imagem</p>
              <input type="file" accept='image/*' onChange={enviarImagem} />
              <p>Descrição</p>
              <textarea type="text" placeholder='Laço Elegante...' value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>
            <div className="alinhamento">
              <CardProdutoTemplate
                imagem={imagem}
                nome={nome}
                valor={valor}
              />
            </div>
          </div>

          <button onClick={inserirProduto}>INSERIR</button>
        </div>
      </div>

      <div id='invertido' className="sessaoCompleta">
        <div className="sessaoQuadrado">

          <div className="conversao">
            <div className="alinhamento">
              <h1>Altere um produto</h1>
              <select name="sessoes" id="sessoes" onChange={e => setSessaoSelecionadaAlterar(e.target.value)}>
                <option>SELECIONAR</option>
                <option value="Faixas de bebe">Faixas de bebe</option>
                <option value="Laços estampados">Laços estampados</option>
                <option value="Kits de laços">Kits de laços</option>
                <option value="Laços decorados">Laços decorados</option>
              </select>
              <p>Nome</p>
              <input type="text" placeholder='Produto' value={alterarNome} onChange={e => setAlterarNome(e.target.value)} />
              <p>Valor</p>
              <input type="text" placeholder='99,99' ref={withMask("99,99")} value={alterarValor} onChange={e => setAlterarValor(e.target.value)} />
              <p>Quantidade</p>
              <input type="text" value={alterarQuantidade} onChange={e => setAlterarQuantidade(e.target.value)} />
              <p>Imagem</p>
              <input type="file" accept='image/*' onChange={alterarImagemBase} />
              <p>Descrição</p>
              <textarea type="text" placeholder='Laço Elegante...' value={alterarDescricao} onChange={e => setAlterarDescricao(e.target.value)} />
            </div>
            <div className="alinhamento">
              <p>ID do produto</p>
              <input type="text" placeholder='0' value={idProduto} onChange={e => setIdProduto(e.target.value)} />
              <CardProdutoId
                id={idProduto}
              />
            </div>
          </div>

          <div className="alinharBotoes">
            <button onClick={alterarProduto}>ALTERAR</button>
            <button onClick={deletarProduto}>DELETAR</button>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  );
}