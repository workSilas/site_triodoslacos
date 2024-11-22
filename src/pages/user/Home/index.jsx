import './index.scss';
import Nav from '../../../components/Nav';
import Rodape from '../../../components/Rodape';
import { Link } from 'react-router-dom';
import BotaoAdm from '../../../components/BotaoAdm';
import Carrossel from '../../../components/Carrossel';
import AnimatedSection from '../../../components/Animaçao';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    document.title = 'Trio Dos Laços | Início';
  }, []);

  return (
    <div className="Home">
      <Nav titulo="Bem-Vindo(a)!" />
      <BotaoAdm />
      <Carrossel />

      <AnimatedSection>
        <div className="sessaoDescubra">
          <h1>CONHEÇA NOSSAS COLEÇÕES</h1>

          <div className="colecoesDisplay" id="secaoCorAlterada">
            <div className="alinharPropiedades">
              <img src="/assets/images/LaçoDecorado.png" alt="Laço Decorado" />
              <p>Laços Decorados</p>
            </div>

            <div className="alinharPropiedades">
              <p>
                Coleção de laços <br />
                decorados com enfeites diversos
              </p>
              <Link to={'/CatalogoLacosDecorados'} className='botao'>VER</Link>
            </div>
          </div>

          <div className="colecoesDisplay">
            <div className="alinharPropiedades">
              <img src="/assets/images/FaixaBebe.png" alt="Faixas de Bebê" />
              <p>Faixas de Bebê</p>
            </div>

            <div className="alinharPropiedades">
              <p>
                Faixas estilizadas e <br />
                adoráveis
              </p>
              <Link to={'/CatalogoFaixasDeBebe'} className='botao'>VER</Link>
            </div>
          </div>

          <div className="colecoesDisplay" id="secaoCorAlterada">
            <div className="alinharPropiedades">
              <img src="/assets/images/LaçoEstampado.png" alt="Laço Estampado" />
              <p>Laços Estampados</p>
            </div>

            <div className="alinharPropiedades">
              <p>
                Laços com inúmeras estampas, <br />
                coloridas e leves
              </p>
              <Link to={'/CatalogoLacosEstampados'} className='botao'>VER</Link>
            </div>
          </div>

          <div className="colecoesDisplay">
            <div className="alinharPropiedades">
              <img src="/assets/images/Kits.png" alt="Kits de Laços" />
              <p>Kits de Laços</p>
            </div>

            <div className="alinharPropiedades">
              <p>
                Kits com os mais variados <br />
                conjuntos de laços
              </p>
              <Link to={'/CatalogoKitsDeLacos'} className='botao'>VER</Link>
            </div>
          </div>

        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="sessaoEncomendas">
          <p>Não encontrou nada que te agrade? <br />
            Faça sua <b style={{ color: "#FFB099" }}>própria configuração! Use da <br />
              sua imaginação para vestir seu bebê.</b></p>
          <Link to={'/Encomendas'} className='botao'>ENCOMENDAR</Link>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="sessoDeVoltaAoCatalogo">
          <div className="alinharComponentes">
            <p>Ainda não viu nossos produtos? <br />
              Explore nosso catálogo recheado <br />
              de acessórios que darão brilho <br />
              ao seu bebê!</p>
            <Link to={'/CatalogoLacosDecorados'} className='botao'>CATÁLOGO</Link>
          </div>

          <img src="/assets/images/laçoVetorzado.png" alt="Laço" />
        </div>
      </AnimatedSection>

      <Rodape />
    </div>
  );
}
