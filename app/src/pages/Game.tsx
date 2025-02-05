import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import './Game.css';

export default function Game() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les questions depuis notre API Express
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:3000/api/quiz');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) return <p>Chargement des questions...</p>;
  if (!questions.length) return <p>Aucune question trouvée.</p>;

  const currentQuestion = questions[currentIndex];
  const isGameOver = currentIndex >= questions.length;

  function handleNextQuestion() {
    // Réinitialiser la sélection de réponse avant de passer à la question suivante
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <div>
      {isGameOver ? (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <h2 className="font-bold text-2xl mb-4">Quiz terminé !</h2>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Rejouer
            </button>
            <NavLink className="btn btn-secondary" to="/" end>
              Retour à l'accueil
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-bold text-2xl mb-4">
            Question{' '}
            <span className="badge badge-accent badge-lg">
              {currentIndex + 1} / {questions.length}
            </span>
          </h2>
          <h3 className="font-bold mb-4">{currentQuestion.question}</h3>

          <div className="flex gap-2 justify-center mb-4">
            <div className="badge badge-primary badge-lg">
              {currentQuestion.difficulty === 'facile' && 'Facile 🐤'}
              {currentQuestion.difficulty === 'normal' && 'Normal 💪'}
              {currentQuestion.difficulty === 'difficile' && 'Difficile 💀'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 quizz--answers">
            {currentQuestion.options.map((answer: string, index: number) => {
              const isCorrect = answer === currentQuestion.answer;
              const isWrong = answer === selectedAnswer && !isCorrect;

              return (
                <div
                  key={index}
                  className={`card text-neutral-content max-w-sm p-4 text-center transition-all duration-300 ${
                    selectedAnswer
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : isWrong
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-700 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedAnswer(answer)}
                >
                  <div className="card-body items-center text-center">{answer}</div>
                </div>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className="flex justify-center mt-8">
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                {currentIndex < questions.length - 1 ? 'Prochaine question' : 'Voir les résultats'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
