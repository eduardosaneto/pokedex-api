import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemons";

export async function createPokemon() {
    const pokemonRepository = getRepository(Pokemon);

    const pokemon = {
        id: 1,
        name: "Testmon",
        number: 2,
        image: "TestmonImage",
        weight: 50,
        height: 150,
        baseExp: 300,
        description: "Testmon description",
        inMyPokemons: false
    };
    
    return await pokemonRepository.save(pokemon);    
}

export async function getAllPokemons() {
    return await getRepository(Pokemon).find();
}