import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../../entities/user.entity";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

import { Ilogin } from "../../interfaces/interfaces";

export const userLogin = async (userData: Ilogin) => {
  try {
    const user = await getRepository(User).findOne({ username: userData.username }, { select: ["id", "username", "password"] });
    if (!user) throw new Error(`usuario o contraseña invalida`);
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new Error(`usuario o contraseña invalida`);
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign({ payload }, `${process.env.KEY_PRIVATE}`, { expiresIn: 3600 * 24 });
    return token;
  } catch (error) {
    return { failed: true, status: 500, message: error.toString() };
  }
};
