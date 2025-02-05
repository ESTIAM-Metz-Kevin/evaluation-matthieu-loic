import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import appConfig from "./config/app";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";

// Importer les routes du quiz
import quizRoutes from './routes/quiz';

dotenv.config();

/**
 * On créé une nouvelle "application" express
 */
const app = express();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors());

/**
 * Route Homepage (uniquement nécessaire pour cette démo)
 */
app.get("/", (request, response) => {
  response.send("🏠 Bienvenue sur votre Application backend API :)");
});

// ✅ Ajouter ici la route du quiz
app.use("/api", quizRoutes); // <-- Ajouter cette ligne pour lier les routes du quiz

app.use("/pokedex", function (req, res, next) {});

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", UnknownRoutesHandler);

/**
 * Gestion des erreurs
 */
app.use(ExceptionsHandler);

/**
 * On demande à Express d'écouter les requêtes sur le port défini dans la config
 */
app.listen(appConfig().port, () =>
  console.log(
    `🚀 Server has started and listening on port ${appConfig().port}.`
  )
);
