import { getConnection } from "typeorm";
import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import UsersPokemons from "../entities/UsersPokemons";
import axios from "axios";


export async function getAllPokemon (userId: number) {
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
    
    if (deletePokemon.affected !== 0) return 200;

    return 404;
}

export async function checkDb() {
  const thereIsPokemon = getRepository(Pokemons).findOne({ where: { id: 1 }, });
  if (thereIsPokemon) return false;
  else return true;
}

export async function populatePokemon() {
  const pokemon = getPokemons();
  return pokemon;
}

export async function getPokemons(){
  const pokemons = [];
  for (let i = 1; i <= 10; i++) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = {
      id: response.data.id, 
      name: response.data.name, 
      number: response.data.order,
      image: response.data.sprites.front_default, 
      weight: response.data.weight,
      height: response.data.height, 
      baseExp: response.data.base_experience, 
      description: "",
      inMyPokemons: false
    };
    const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    pokemon.description = species.data.flavor_text_entries[0].flavor_text.split("\n").join(" ");
    pokemons.push(pokemon);
  }
  await getRepository(Pokemons).save(pokemons);
  return pokemons;
}