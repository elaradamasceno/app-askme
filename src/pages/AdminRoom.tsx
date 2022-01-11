import { useParams } from 'react-router-dom';

import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Questions } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const params = useParams<RoomParams>();

  const roomId = params.id as string;
  const {title, questions} = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="Logo"/>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined={true}> Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span> {questions.length} {questions.length > 1 ? 'Perguntas' : 'Pergunta' }</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions 
                key={question.id}
                content={question.content} 
                author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}