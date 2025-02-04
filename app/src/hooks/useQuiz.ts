// app/src/hooks/useQuiz.ts

import { useState, useEffect } from "react";

// Remplace par l'URL de ton propre backend Express
const API_URL = "http://localhost:5000/api/quizz"; 

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
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  function handleAnswer(answer: string) {
    if (selectedAnswer) return; // Empêche de changer de réponse après avoir cliqué une fois

    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].réponse) {
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
