import { Request, Response } from 'express';

// Récupère la fonction fetch pour effectuer des requêtes HTTP
const fetch = globalThis.fetch; 

// URL de l'API pour obtenir des questions de quiz
const API_URL = 'https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos';

// Fonction pour récupérer les questions du quiz
export const fetchQuestions = async () => {
  try {
    const response = await fetch(API_URL); // Envoie la requête GET

    // Vérifie si la réponse est valide
    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
    }

    const text = await response.text(); // Récupère la réponse en texte brut
    const data = JSON.parse(text); // Parse la réponse en JSON

    // Formate les données : mélange des réponses et récupération des infos importantes
    return data.quizzes.map((quiz: any) => ({
      question: quiz.question,
      answer: quiz.answer,
      options: [...quiz.badAnswers, quiz.answer].sort(() => Math.random() - 0.5),
      difficulty: quiz.difficulty,
    }));
  } catch (error) {
    console.error("❌ Erreur :", error); // Affiche l'erreur si un problème survient
    throw error;
  }
};
