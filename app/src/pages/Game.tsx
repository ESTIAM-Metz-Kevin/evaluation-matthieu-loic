import { useQuiz } from "../hooks/useQuiz";
import { NavLink } from "react-router";
import "./Game.css";

export default function Game() {
  const { questions, currentIndex, selectedAnswer, score, loading, handleAnswer, nextQuestion } =
    useQuiz();

  if (loading) return <p>Chargement des questions...</p>;
  if (!questions.length) return <p>Aucune question trouvée.</p>;

  const currentQuestion = questions[currentIndex];
  const isGameOver = currentIndex >= questions.length;

  return (
    <div>
      {isGameOver ? (
        <div className="flex flex-col gap-2 mt-8 justify-center items-center">
          <h2 className="font-bold text-2xl mb-4">Quiz terminé !</h2>
          <p>
            Votre score :{" "}
            <span className="badge badge-primary badge-lg">
              {score} / {questions.length}
            </span>
          </p>
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

          {/* 🏆 Affichage du niveau de difficulté avec emojis */}
          <div className="flex gap-2 justify-center mb-4">
            <div className="badge badge-primary badge-lg">
              {currentQuestion.difficulté === "facile" && "Facile 🐤"}
              {currentQuestion.difficulté === "normal" && "Normal 💪"}
              {currentQuestion.difficulté === "difficile" && "Difficile 💀"}
            </div>
          </div>

          {/* 📌 Réponses en grille 2x2 bien alignées */}
          <div className="grid grid-cols-2 gap-4 quizz--answers">
            {currentQuestion.propositions.map((answer: string, index: number) => {
              const isCorrect = answer === currentQuestion.réponse;
              const isWrong = answer === selectedAnswer && !isCorrect;

              return (
                <div
                  key={index}
                  className={`card text-neutral-content max-w-sm p-4 text-center transition-all duration-300 ${
                    selectedAnswer
                      ? isCorrect
                        ? "bg-green-500 text-white" // Bonne réponse
                        : isWrong
                        ? "bg-red-500 text-white" // Mauvaise réponse sélectionnée
                        : "bg-gray-700 text-white" // Autres réponses
                      : "bg-gray-800 text-white hover:bg-gray-600"
                  }`}
                  onClick={() => handleAnswer(answer)}
                >
                  <div className="card-body items-center text-center">{answer}</div>
                </div>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className="flex justify-center mt-8">
              <button className="btn btn-primary" onClick={nextQuestion}>
                {currentIndex < questions.length - 1 ? "Prochaine question" : "Voir les résultats"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
