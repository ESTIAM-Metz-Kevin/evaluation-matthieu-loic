import { Router } from 'express';
import { fetchQuestions } from '../controllers/quizController';

const router = Router();


router.get('/quiz', async (req, res) => {
  try {
    const questions = await fetchQuestions();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Erreur API :", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ message: 'Erreur de récupération des questions', error: errorMessage });
  }
});



export default router; 
