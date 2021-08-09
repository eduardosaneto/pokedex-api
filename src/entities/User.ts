import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UsersPokemons from "./UsersPokemons";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UsersPokemons, (pokemon) => pokemon.user)
  pokemon: UsersPokemons[]
}
