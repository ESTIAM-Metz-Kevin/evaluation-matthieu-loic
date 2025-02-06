import { Router } from 'express';
import { startGame, updateGameScore, listGames } from '../controllers/gameController';

const router = Router();

// Démarre une nouvelle partie
router.post('/game/start', startGame);

// Met à jour le score d'une partie spécifique avec l'ID fourni
router.put('/game/:id/score', updateGameScore);

// Récupère l'historique des parties jouées
router.get('/game/history', listGames);



export default router;