import { useState, useEffect } from "react";

// Changer l'API_URL pour utiliser l'API locale
const API_URL = "http://localhost:3000/api/quiz"; // Remplace par ton API locale

export function useQuiz() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setQuestions(
          data.map((q: any) => ({
            question: q.question,
            answer: q.answer,  // Remplacer 'réponse' par 'answer'
            options: [...q.options], // Les options sont déjà sous forme de tableau
            difficulty: q.difficulty,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []); // Cette partie ne change pas

  function handleAnswer(answer: string) {
    if (selectedAnswer) return; // Empêche de changer de réponse après avoir cliqué une fois

    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].answer) {  // Utilise 'answer' pour la bonne réponse
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  }

  return { questions, currentIndex, selectedAnswer, score, loading, handleAnswer, nextQuestion };
}
