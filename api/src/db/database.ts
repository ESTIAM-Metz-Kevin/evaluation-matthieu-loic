import sqlite3 from 'sqlite3';

// Création ou ouverture de la base de données
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erreur d\'ouverture de la base de données:', err);
  } else {
    console.log('Base de données ouverte avec succès');
  }
});

// Fonction pour créer la table des parties (si elle n'existe pas)
const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playerName TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      date TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error('Erreur lors de la création des tables:', err);
    } else {
      console.log('Table "games" créée avec succès');
    }
  });
};

// Appel de la fonction pour créer les tables au démarrage
createTables();

// Exporter la base de données pour l'utiliser dans d'autres fichiers
export const getDb = () => db;
