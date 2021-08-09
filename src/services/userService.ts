import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getRepository } from "typeorm";

import User from "../entities/User";
import Session from "../entities/Sessions";

export async function signUp (email: string, password: string){
  const repository = getRepository(User);

  const hashedPassword = bcrypt.hashSync(password, 10);

  await repository.insert({email, password: hashedPassword});
}

export async function getUserByEmail(email: string) {
  const checkIfEmailExists = await getRepository(User).findOne({
    where: { email }
  });
  return checkIfEmailExists;
}

export async function signIn (email: string, password: string): Promise<string> {
  const userRepository = getRepository(User);
  const sessionRepository = getRepository(Session);

  const user = await userRepository.findOne({ email });

  if(!user) return null;

  if(bcrypt.compareSync(password, user.password)){
    const token = uuid();
    await sessionRepository.insert( { userId: user.id, token })
    return token;

  } else {
    return null;
  }
}