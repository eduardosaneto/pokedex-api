import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UsersPokemons from "./UsersPokemons";

@Entity("pokemons")
export default class Pokemons{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @Column()
    image: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    baseExp: number;

    @Column()
    description: string;

    @Column()
    inMyPokemons: boolean;

    @OneToMany(() => UsersPokemons, pokemons => pokemons.pokemon)
    myPokemons: UsersPokemons[];
}