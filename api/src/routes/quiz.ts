import { Router } from 'express';
import { fetchQuestions } from '../controllers/quizController';

const router = Router();

// Route pour récupérer les questions du quiz
router.get('/quiz', async (req, res) => {
  try {
    const questions = await fetchQuestions(); // Récupère les questions via le contrôleur
    res.status(200).json(questions); // Répond avec les questions
  } catch (error) {
    console.error("Erreur API :", error); // Log l'erreur
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ message: 'Erreur de récupération des questions', error: errorMessage });
  }
});

export default router;
