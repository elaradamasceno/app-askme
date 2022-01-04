import { useNavigate } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImage from '../assets/images/logo.svg';
import GoogleIcon from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function Home(){
  const navigate = useNavigate();
  const { user, signInWithGoogle} = useAuth();

  const handleCreateRoom = async() => {
    if(!user){
      await signInWithGoogle();
    }

    navigate('/rooms/new');
  }
  
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

          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form action="">
            <input type="text" placeholder="Digite o código da sala"/>
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}