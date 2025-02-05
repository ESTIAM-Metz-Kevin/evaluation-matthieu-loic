import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Fichier SQLite
  logging: false, // Désactiver les logs SQL
});

export default sequelize;
