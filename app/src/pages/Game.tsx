import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router";
import "./Game.css";

// Définition de l'interface TypeScript pour une question
interface Question {
  question: string;
  answer: string;
  options: string[];
  difficulty: string;
}

export default function Game() {
  // Récupération des paramètres d'URL
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id");

  // États pour stocker les questions, l'index actuel, la réponse sélectionnée, le score et le statut de chargement
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Chargement des questions depuis l'API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3000/api/quiz");
        const data = await response.json();
        setQuestions(data); // Stocke les questions récupérées
      } catch (error) {
        console.error("Erreur de chargement des questions :", error);
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    }
    fetchQuestions();
  }, []); // [] signifie que cet effet ne s'exécute qu'une seule fois au montage

  // Réinitialise la réponse sélectionnée lorsqu'on change de question
  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentIndex]);

  // Fonction pour gérer la sélection d'une réponse
  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].answer) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Mise à jour du score dans l'API
      await fetch(`http://localhost:3000/api/game/${gameId}/score`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: newScore }),
      }).catch((error) => console.error("Erreur de mise à jour du score :", error));
    }
  };

  // Fonction pour passer à la question suivante
  const goToNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Affichage d'un message de chargement si les questions ne sont pas encore disponibles
  if (loading) return <p>Chargement des questions...</p>;
  if (!questions.length) return <p>Aucune question trouvée.</p>;

  const currentQuestion = questions[currentIndex];
  const isGameOver = currentIndex >= questions.length;

  return (
    <div>
      {isGameOver ? (
        // Affichage des résultats lorsque le quiz est terminé
        <div className="flex flex-col gap-4 mt-8 justify-center items-center">
          <h2 className="font-bold text-2xl mb-4">Quiz terminé !</h2>
          <p className="text-lg">Ton score : {score} / {questions.length}</p>
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
        // Affichage de la question actuelle et des options de réponse
        <>
          <h2 className="font-bold text-2xl mb-4">
            Question <span className="badge badge-accent badge-lg">
              {currentIndex + 1} / {questions.length}
            </span>
          </h2>
          <h3 className="font-bold mb-4">{currentQuestion.question}</h3>

          <div className="flex gap-2 justify-center mb-4">
            <div className="badge badge-primary badge-lg">
              {currentQuestion.difficulty === "facile" && "Facile 🐤"}
              {currentQuestion.difficulty === "normal" && "Normal 💪"}
              {currentQuestion.difficulty === "difficile" && "Difficile 💀"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 quizz--answers">
            {currentQuestion.options.map((answer: string, index: number) => {
              const isCorrect = answer === currentQuestion.answer;
              const isWrong = selectedAnswer && answer === selectedAnswer && !isCorrect;
              
              return (
                <div
                  key={index}
                  className={`card max-w-sm p-4 text-center transition-all duration-300 ${
                    selectedAnswer
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : isWrong
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-white"
                      : "bg-gray-800 text-white hover:bg-gray-600"
                  }`}
                  onClick={() => !selectedAnswer && handleAnswer(answer)}
                >
                  <div className="card-body">{answer}</div>
                </div>
              );
            })}
          </div>

          {selectedAnswer && (
            // Bouton pour passer à la question suivante
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-primary"
                onClick={goToNextQuestion}
              >
                {currentIndex < questions.length - 1 ? 'Prochaine question' : 'Voir les résultats'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
