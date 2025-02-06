import { Request, Response } from 'express';
import { createGame, updateScore, getGames } from '../models/game.models';
import fs from 'fs';
import path from 'path';

export const startGame = (req: Request, res: Response) => {
  const { player } = req.body;
  if (!player) res.status(400).json({ message: 'Pseudo requis' });

  const newGame = createGame(player);
  res.status(201).json(newGame);
};

export const updateGameScore = (req: Request, res: Response) => {
  const { id } = req.params;
  const { score } = req.body;

  const updatedGame = updateScore(parseInt(id), score);
  if (!updatedGame) res.status(404).json({ message: "Partie non trouvée" });

res.status(200).json(updatedGame);
};


export const listGames = (req: Request, res: Response) => {
  res.status(200).json(getGames());
};
