import { Link } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImage from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom(){
  return(
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="Imagem ilustrativa"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={LogoImage} alt="Logo" />
          <h2>Criar uma nova sala</h2>

          <form action="">
            <input type="text" placeholder="Nome da sala"/>
            <Button>Criar sala</Button>
          </form>

          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}