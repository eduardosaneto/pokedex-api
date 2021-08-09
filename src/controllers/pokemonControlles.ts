import { Request, Response } from "express";

import * as pokemonsService from "../services/pokemonServices";

export async function geAllPokemon (req: Request, res: Response) {
  try {
    const userId  = res.locals.userId;
    const pokemon = await pokemonsService.getPokemon(userId);
    res.send(pokemon);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}