import { Request, Response } from 'express';

// Fonction pour récupérer les questions depuis l'API externe
const fetch = globalThis.fetch; 

const API_URL = 'https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos';

export const fetchQuestions = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur API externe : ${response.status} ${response.statusText}`);
    }

    const text = await response.text(); // Récupérer la réponse brute
    const data = JSON.parse(text);

    return data.quizzes.map((quiz: any) => ({
      question: quiz.question,
      answer: quiz.answer,
      options: [...quiz.badAnswers, quiz.answer].sort(() => Math.random() - 0.5),
      difficulty: quiz.difficulty,
    }));
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error);
    throw error;
  }
};
