import * as repositories from "../../repositories/users/users";
import * as bcrypt from "bcrypt";

import { IUser } from "../../interfaces/interfaces";

export const createUser = async (userData: IUser) => {
  try {
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const response = await repositories.createUser(userData);
    return response;
  } catch (error) {
    return { failed: true, status: 500, message: error.toString() };
  }
};

export const getUsers = async () => {
  try {
    const response = await repositories.getUsers();
    return response;
  } catch (error) {
    return {
      failed: true,
      status: 500,
      message: error.toString(),
    };
  }
};
