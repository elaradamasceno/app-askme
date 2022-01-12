import { useParams, useNavigate } from 'react-router-dom';

import logoImage from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { Questions } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const navigate = useNavigate();
  const params = useParams<RoomParams>();

  const roomId = params.id as string;
  const {title, questions} = useRoom(roomId);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    navigate('/');
  }

  const handleCheckQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="Logo"/>
          <div>
            <RoomCode code={roomId} />
            <Button 
              onClick={handleEndRoom}
              isOutlined={true}
            > 
              Encerrar sala
            </Button>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida"/>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta"/>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta"/>
                </button>
              </Questions>
            )
          })}
        </div>
      </main>
    </div>
  )
}