import './index.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Rodape() {


  const [counter, setCounter] = useState(0)
  const navigate = useNavigate()

  function abrirAdm() {

    if (counter < 2) {
      setCounter(counter + 1)
    }
    else {
      navigate("/Entrar")
      toast.success("Você acessou o login administrativo.", {
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
      setCounter(0)
    }
  }


  return (
    <div className='Rodape'>

      <div className="separacaoComponentesRodape">
        <div onClick={abrirAdm}><img src="/assets/images/LogoOficial.png" alt="logo" /></div>
      </div>

      <div className="alinhamentoTopo">

        <div className="separacaoComponentesRodape">
          <h1>SUPORTE</h1>
          <Link target='_blank' to={"https://wa.me/5511977798407?text=Olá! Gostaria de saber mais sobre seus serviços."}>Contato</Link>
        </div>

        <div className="separacaoComponentesRodape">
          <h1>PARCEIROS</h1>
          <Link target='_blank' to={"http://4.172.207.208:3042"}>Vikings</Link>
        </div>

        <div className="separacaoComponentesRodape">
          <h1>SIGA-NOS</h1>
          <div className="alinhamentoImagens">
            <Link target='_blank' to={"https://www.instagram.com/trio_dos_lacos/"}><img src="/assets/images/Instagram.png" alt="instagam" /></Link>
            <Link target='_blank' to={"https://www.facebook.com/profile.php?id=100087909888766"}><img src="/assets/images/Facebook.png" alt="facebook" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
