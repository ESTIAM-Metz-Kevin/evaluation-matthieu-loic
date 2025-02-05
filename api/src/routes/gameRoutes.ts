import { Router } from 'express';
import { startGame, updateGameScore, listGames } from '../controllers/gameController';

const router = Router();

router.post('/game/start', startGame);
router.put('/game/:id/score', updateGameScore);
router.get('/game/history', listGames);

export default router;