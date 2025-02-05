import { useNavigate } from "react-router";
import { SetStateAction, useState, useEffect } from "react";

type Player = {
  pseudo: string;
  points: number;
  date: string;
};

function Home() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [points, setPoints] = useState(0); // pour les points
  const [players, setPlayers] = useState<Player[]>([]);

  // Charger les résultats depuis localStorage
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    setPlayers(storedPlayers);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newPlayer: Player = {
      pseudo,
      points,
      date: new Date().toLocaleString(),
    };

    // Sauvegarder le nouveau joueur dans localStorage
    const storedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    storedPlayers.push(newPlayer);
    localStorage.setItem("players", JSON.stringify(storedPlayers));

    navigate("/game");
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPseudo(e.target.value);
  };

  return (
    <div>
      <h2 className="font-bold">Historique des parties</h2>

      <div className="overflow-x-auto mb-14">
        <div className="scroll-container">
          <table className="table">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <th>{player.pseudo}</th>
                  <td>{player.points}</td>
                  <td>{player.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form className="join" onSubmit={handleSubmit}>
        <input
          className="input input-bordered join-item"
          placeholder="Ton pseudo"
          value={pseudo}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary join-item rounded-r-full">
          Jouer une partie
        </button>
      </form>
    </div>
  );
}

export default Home;
