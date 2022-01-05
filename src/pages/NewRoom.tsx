import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { Button } from '../components/Button';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImage from '../assets/images/logo.svg';



import '../styles/auth.scss';

export function NewRoom(){
  const navigate = useNavigate();
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState<string>('');

  const handleCreateRoom = async (e: FormEvent ) => {
    e.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    //criando a categoria e jogando a informação no BD
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    }); 

    const url = `/rooms/${firebaseRoom.key}`;
    navigate(url);
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
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button>Criar sala</Button>
          </form>

          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
        </div>
      </main>
    </div>
  )
}