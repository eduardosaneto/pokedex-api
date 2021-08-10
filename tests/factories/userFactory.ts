import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";
import Sessions from "../../src/entities/Sessions";

export async function createUser(email?: string, password?: string) {
    const user = {
        email,
        password             
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

export async function createSession(userId: number) {
    const session = {
        userId,
        token: "a1b2c3d4e5"
    };

    await getRepository(Sessions).save({
        token: session.token,
        userId: userId
    });

    return session;
}

// export async function createAnotherUser(password?: string) {
//     const user = {
//         email: "email@email.com",
//         password
//     };

//     const newUser = await getRepository(User).save({       
//         email: user.email,
//         password: bcrypt.hashSync(user.password, 10)
//     });

//     return newUser;
// }