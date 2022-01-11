import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImage from '../assets/images/logo.svg';
import GoogleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home(){
  const navigate = useNavigate();
  const { user, signInWithGoogle} = useAuth();

  const [roomCode, setRoomCode] = useState<string>('')

  const handleCreateRoom = async() => {
    if(!user){
      await signInWithGoogle();
    }

    navigate('/rooms/new');
  }

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Esta sala foi encerrada.');
      return
    }

    navigate(`/rooms/${roomCode}`);
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

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}