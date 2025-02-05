import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/games.json');

// Lire les données du fichier JSON
const readData = (): any[] => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON :", error);
    return [];
  }
};

// Écrire les données dans le fichier JSON
const writeData = (data: any[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Erreur lors de l'écriture du fichier JSON :", error);
  }
};

// Ajouter une nouvelle partie
export const createGame = (player: string) => {
  const games = readData();
  const newGame = { id: games.length + 1, player, score: 0, date: new Date().toISOString() };
  games.push(newGame);
  writeData(games);
  return newGame;
};

// Mettre à jour le score d'une partie
export const updateScore = (id: number, score: number) => {
  const games = readData();
  const gameIndex = games.findIndex((g) => g.id === id);
  if (gameIndex !== -1) {
    games[gameIndex].score = score;
    writeData(games);
    return games[gameIndex];
  }
  return null;
};

// Récupérer toutes les parties
export const getGames = () => readData();
