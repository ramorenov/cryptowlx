import { closeTypeOrmConn, createTypeOrmConn, openTypeOrmConn } from "../config/ormconnection";
import { IUserR } from "../interfaces/interfaces";
const request = require("supertest");
const { app, server } = require("../index");

beforeAll(async () => {
  await createTypeOrmConn();
  await openTypeOrmConn();
  await request(app).post("/users").send({
    name: "ricardo",
    last_name: "moreno",
    username: "ramorenov",
    password: "A123456a",
    pref_currency: "eur",
  });
});

describe("POST /login", () => {
  test("debe responder un token con status 200 al hacer login correctamente", async () => {
    await request(app)
      .post("/login")
      .send({
        username: "ramorenov",
        password: "A123456a",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res: { body: IUserR }) => {
        expect(res.body).toHaveProperty("token");
      });
  });

  test("debe responder status 401 si el usuario ingresa un usuario que no existe en DB", async () => {
    await request(app)
      .post("/login")
      .send({
        username: "xxxx",
        password: "A123456a",
      })
      .expect(401)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "usuario o contraseña invalida");
      });
  });

  test("debe responder status 401 si el usuario ingresa un usuario con contraseña invalida", async () => {
    await request(app)
      .post("/login")
      .send({
        username: "ramorenov",
        password: "A654321a",
      })
      .expect(401)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "usuario o contraseña invalida");
      });
  });
});

afterAll(async () => {
  await closeTypeOrmConn();
  await server.close();
});
