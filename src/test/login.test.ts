import { createTypeOrmConn } from "../config/ormconnection";

const request = require("supertest");
const { app, server } = require("../index");

beforeAll(async () => {
  await createTypeOrmConn();
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
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("token");
      });
  });

  test("debe responder status 401 si el usuario ingresa mal la contraseña o el username", async () => {
    await request(app)
      .post("/login")
      .send({
        username: "camilagf",
        password: "A123456a",
      })
      .expect(401)
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("message", "usuario o contraseña invalida");
      });
  });
});

afterAll(async () => {
  await server.close();
});
