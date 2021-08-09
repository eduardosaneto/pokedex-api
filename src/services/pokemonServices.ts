import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UsersPokemons from "../entities/UsersPokemons";

export async function getPokemon (userId: number) {
  const pokemon = await getRepository(Pokemons).find();
  const usersPokemons = await getRepository(UsersPokemons).find({ where: { userId } });
  const usersPokemonsList = pokemon.map(p => { usersPokemons.forEach(up => { if (p.id === up.pokemonId) {
    p.inMyPokemons = true
  }})
    return p 
  });

  return usersPokemonsList;
}

export async function addToMyPokemons (userId: number, pokemonId: number) {
    const usersPokemons = await getRepository(UsersPokemons).find({ where: { userId } });
    const usersPokemonsList = usersPokemons.map(p => p.pokemonId);
  
    if (!usersPokemonsList.includes(pokemonId)) {
      await getRepository(UsersPokemons).save({ userId, pokemonId });   
      return 200;
    }
    return 409;
  }
  
  export async function deleteFromMyPokemons(userId: number, pokemonId: number) {
    const deletePokemon = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UsersPokemons)
      .where("userId = :userId AND pokemonId = :pokemonId", { userId, pokemonId })
      .execute();
    
    if (deletePokemon) return 200;
  
    return 404;
  }