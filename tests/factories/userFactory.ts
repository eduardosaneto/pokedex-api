import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";
import Session from "../../src/entities/Sessions";

export async function createUser() {
    const user = {
        email: "email@email.com",
        password: "123456"             
    };
  
    const newUser = {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
    }

    const result = await getRepository(User).insert(newUser);
    const { id } = result.generatedMaps[0];      
    return { ...user, id } 
}

export async function getAllUsers() {
    return await getRepository(User).find();
}