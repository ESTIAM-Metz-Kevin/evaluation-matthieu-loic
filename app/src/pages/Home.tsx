import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const navigate = useNavigate(); // Hook pour la navigation entre les pages
  const [pseudo, setPseudo] = useState(""); // État pour stocker le pseudo du joueur
  const [games, setGames] = useState<any[]>([]); // État pour stocker l'historique des parties

  // useEffect s'exécute une seule fois au montage du composant pour récupérer l'historique
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("http://localhost:3000/api/game/history"); // Récupère les parties depuis l'API
        const data = await response.json();
        // Trie les parties par score décroissant (du plus grand au plus petit)
        data.sort((a: any, b: any) => b.score - a.score);
        setGames(data); // Met à jour l'état avec les parties triées
      } catch (error) {
        console.error("Erreur lors du chargement des parties :", error);
      }
    }
    fetchGames();
  }, []); // Dépendance vide → l'effet s'exécute uniquement au montage

  // Fonction qui démarre une nouvelle partie en envoyant le pseudo du joueur à l'API
  const startGame = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page au submit
    if (!pseudo.trim()) return; // Vérifie que le pseudo n'est pas vide

    const response = await fetch("http://localhost:3000/api/game/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: pseudo }), // Envoie le pseudo en JSON
    });

    const data = await response.json();
    navigate(`/game?id=${data.id}&player=${pseudo}`); // Redirige vers la page du jeu avec l'ID de la partie
  };

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>

      {/* Conteneur avec un scroll vertical si plus de 10 joueurs */}
      <div className="overflow-x-auto mb-14" style={{ maxHeight: "400px", overflowY: "scroll" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Joueur</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {games.slice(0, 10).map((game, index) => {
              // Détermine la classe CSS pour les 3 premiers (or, argent, bronze)
              const placeClass = 
                index === 0 ? "first-place" :
                index === 1 ? "second-place" :
                index === 2 ? "third-place" :
                "";

              // Ajuste la taille du texte pour les positions 1, 2 et 3
              const rankStyle = 
                index === 0 ? { fontSize: "1.5rem", fontWeight: "bold" } :
                index === 1 ? { fontSize: "1.25rem", fontWeight: "bold" } :
                index === 2 ? { fontSize: "1.1rem", fontWeight: "bold" } :
                { fontSize: "1rem" };

              return (
                <tr key={game.id} className={placeClass}>
                  <td style={rankStyle}>#{index + 1}</td> {/* Affiche le rang du joueur */}
                  <td>{game.player}</td> {/* Affiche le pseudo du joueur */}
                  <td>{game.score}/10</td> {/* Affiche le score du joueur */}
                  <td>{new Date(game.date).toLocaleString()}</td> {/* Affiche la date formatée */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Formulaire pour entrer son pseudo et commencer une partie */}
      <form className="join" onSubmit={startGame}>
        <input
          className="input input-bordered join-item"
          placeholder="Ton pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <button className="btn btn-primary join-item">Jouer une partie</button>
      </form>
    </div>
  );
}

export default Home;
