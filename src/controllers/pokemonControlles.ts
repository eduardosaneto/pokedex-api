import { Request, Response } from "express";

import * as pokemonServices from "../services/pokemonServices";

export async function loadAllPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemon = await pokemonServices.getAllPokemon(userId);
    res.send(pokemon);
}

export async function addToMyPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = req.params.id;
  
    const status = await pokemonServices.addToMyPokemons(userId, Number(pokemonId));
    res.sendStatus(status);
}
  
export async function deleteFromMyPokemons(req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = req.params.id;

    const statusCode = await pokemonServices.deleteFromMyPokemons(userId, Number(pokemonId));
    res.sendStatus(statusCode);
}

export async function populatePokemon(req: Request, res: Response) {
    const empty = checkDb();
    if(empty) return pokemonServices.populatePokemon();
}

export async function checkDb(){
    const empty = pokemonServices.checkDb();
    if(empty) return true;
}