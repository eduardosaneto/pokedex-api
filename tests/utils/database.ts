import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Sessions";
import UsersPokemons from "../../src/entities/UsersPokemons";
import Pokemons from "../../src/entities/Pokemons";

export async function clearDatabase () {
  await getRepository(UsersPokemons).delete({});
  await getRepository(Session).delete({});
  await getRepository(User).delete({});
  await getRepository(Pokemons).delete({}); 

}