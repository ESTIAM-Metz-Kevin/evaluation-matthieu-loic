let parties: Array<{ id: number; pseudo: string }> = [];
let nextId = 1; // ID auto-incrémenté

export const createNewGame = (pseudo: string) => {
  const newGame = {
    id: nextId++,
    pseudo
  };

  parties.push(newGame);
  return newGame;
};
