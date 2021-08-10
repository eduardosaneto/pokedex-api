import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonControllers from "./controllers/pokemonControlles";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/pokemons", authMiddleware, pokemonControllers.loadAllPokemons);
app.post("/my-pokemons/:id/add", authMiddleware, pokemonControllers.addToMyPokemons);
app.post("/my-pokemons/:id/remove", authMiddleware, pokemonControllers.deleteFromMyPokemons);

export async function init () {
  await connectDatabase();
}

export default app;
