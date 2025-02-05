import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("http://localhost:3000/api/game/history");
        const data = await response.json();
        // Trie les parties par score décroissant
        data.sort((a: any, b: any) => b.score - a.score);
        setGames(data);
      } catch (error) {
        console.error("Erreur lors du chargement des parties :", error);
      }
    }
    fetchGames();
  }, []);

  const startGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudo.trim()) return;

    const response = await fetch("http://localhost:3000/api/game/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: pseudo }),
    });

    const data = await response.json();
    navigate(`/game?id=${data.id}&player=${pseudo}`);
  };

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>

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
              // Gère la classe pour afficher la couleur du top 3
              const placeClass = 
                index === 0 ? "first-place" :
                index === 1 ? "second-place" :
                index === 2 ? "third-place" :
                "";

              // Définir la taille du texte pour les positions 1, 2, et 3
              const rankStyle = 
                index === 0 ? { fontSize: "1.5rem", fontWeight: "bold" } :
                index === 1 ? { fontSize: "1.25rem", fontWeight: "bold" } :
                index === 2 ? { fontSize: "1.1rem", fontWeight: "bold" } :
                { fontSize: "1rem" };

              return (
                <tr key={game.id} className={placeClass}>
                  <td style={rankStyle}>#{index + 1}</td>
                  <td>{game.player}</td>
                  <td>{game.score}/10</td>
                  <td>{new Date(game.date).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
