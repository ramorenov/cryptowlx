import { getRepository } from "typeorm";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/interfaces";

export const createUser = async (userData: IUser) => {
  try {
    const user = getRepository(User).create(userData);
    const result = await getRepository(User).save(user, {});
    const newUser = JSON.parse(JSON.stringify(result));
    delete newUser.password;
    return newUser;
  } catch (error) {
    throw new Error(`No se pudo crear el usuario debido al siguiente error: ${error.toString()}`);
  }
};

export const getUsers = async () => {
  try {
    const result = await getRepository(User).find();
    return result;
  } catch (error) {
    throw new Error(`No se encontraron usuarios: ${error.toString()}`);
  }
};

export const getUserById = async (user_id: string) => {
  try {
    const result = await getRepository(User).findOne(user_id);
    return result;
  } catch (error) {
    throw new Error(`No se encontraron usuarios: ${error.toString()}`);
  }
};
