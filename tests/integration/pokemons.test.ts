import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import * as pokemonFactory from "../factories/pokemonFactory";
import * as userFactory from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();  
});

afterAll(async () => {
  await getConnection().close();
});

describe("get /pokemons", () => {
    it("should answer status 200 and an array with all pokemons when is sent a valid token", async () => {
      const user = await userFactory.createUser("email2@email.com", "12345678");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createPokemon();
      const response = await test.get("/pokemons").set("Authorization", `Bearer ${session.token}`);      
      expect(response.body[0]).toStrictEqual({ ...pokemon, "inMyPokemons": false });
      expect(response.status).toBe(200);
    });

    it("should answer with status 401 for an invalid token authorization", async () => {
      const Unauthorized = await test.get("/pokemons");
      const response = await test.get("/pokemons").set("Authorization", `Bearer token`);;
      expect(Unauthorized.status).toBe(401);
      expect(response.status).toBe(401);
  });
});

describe("POST /my-pokemons/:pokemonId/add", () => {
  it("should answer with status 401 for an invalid token authorization", async () => {
      const pokemon = await pokemonFactory.createPokemon();
      const Unauthorized = await test.post(`/my-pokemons/${pokemon.id}/add`);
      const response = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer token`);
      expect(Unauthorized.status).toBe(401);
      expect(response.status).toBe(401);
  });

  it("should answer with status 200 for a successful pokemon addition to user's list", async () => {
      const user = await userFactory.createUser("email2@email.com", "12345678");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createPokemon();
      const reponse = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
      expect(reponse.status).toBe(200);
  });

  it("should answer with status 409 when adding the same pokemon on user's list", async () => {
    const user = await userFactory.createUser("email2@email.com", "12345678");
    const session = await userFactory.createSession(user.id);
    const pokemon = await pokemonFactory.createPokemon();
    await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
    const response = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toBe(409);
});
});

describe("POST /my-pokemons/:pokemonId/remove", () => {
  it("should answer with status 401 for an invalid token authorization", async () => {
      const pokemon = await pokemonFactory.createPokemon();
      const Unauthorized = await test.post(`/my-pokemons/${pokemon.id}/remove`);
      const response = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer token`);
      expect(Unauthorized.status).toBe(401);
      expect(response.status).toBe(401);
  });

  it("should answer with status 200 for a sucessfull pokemon removed from user's list", async () => {
      const user = await userFactory.createUser("email2@email.com", "12345678");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createPokemon();
      await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
      const response = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${session.token}`);
    
      expect(response.status).toBe(200);
  });

  it("should answer with status 404 for a non existing pokemon in userPokemons list", async () => {
    const user = await userFactory.createUser("email2@email.com", "12345678");
    const session = await userFactory.createSession(user.id);
    const pokemon = await pokemonFactory.createPokemon();
    const response = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(404);
  });
});