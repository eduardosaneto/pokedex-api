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

export async function addToMyPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = req.params.id;
  
    const status = await pokemonsService.addToMyPokemons(userId, Number(pokemonId));
    res.sendStatus(status);
  }
  
  export async function deleteFromMyPokemons(req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = req.params.id;
  
    const statusCode = await pokemonsService.deleteFromMyPokemons(userId, Number(pokemonId));
    res.sendStatus(statusCode);
  }