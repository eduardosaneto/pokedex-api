import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import User from "./User";
import Pokemons from "./Pokemons";

@Entity("users_pokemons")
export default class UsersPokemons{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(() => User, user => user.pokemon)
    user: User;

    @ManyToOne(() => Pokemons, pokemon => pokemon.myPokemons)
    pokemon: Pokemons;
}