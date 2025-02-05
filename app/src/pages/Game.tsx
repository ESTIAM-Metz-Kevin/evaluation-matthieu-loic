import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router";
import "./Game.css";

interface Question {
  question: string;
  answer: string;
  options: string[];
  difficulty: string;
}

export default function Game() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3000/api/quiz");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Erreur de chargement des questions :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentIndex]);

  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);

    if (answer === questions[currentIndex].answer) {
      const newScore = score + 1;
      setScore(newScore);

      // Mettre à jour le score dans l'API
      await fetch(`http://localhost:3000/api/game/${gameId}/score`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: newScore }),
      }).catch((error) => console.error("Erreur de mise à jour du score :", error));
    }
  };

  const goToNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Chargement des questions...</p>;
  if (!questions.length) return <p>Aucune question trouvée.</p>;

  const currentQuestion = questions[currentIndex];
  const isGameOver = currentIndex >= questions.length;

  return (
    <div>
      {isGameOver ? (
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
        <>
          <h2 className="font-bold text-2xl mb-4">
            Question{" "}
            <span className="badge badge-accent badge-lg">
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
