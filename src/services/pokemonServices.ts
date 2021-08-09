import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemons";
import UserPokemons from "../entities/UsersPokemons";

export async function getPokemon (userId: number) {
  const pokemon = await getRepository(Pokemon).find();
  const userPokemons = await getRepository(UserPokemons).find({ where: { userId } });
  const listOfUserPokemons = pokemon.map(p => { userPokemons.forEach(up => { if (p.id === up.pokemonId) {
    p.inMyPokemons = true
  } 
   })
    return p 
  });

  return listOfUserPokemons;
}