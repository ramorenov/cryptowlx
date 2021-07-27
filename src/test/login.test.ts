import { closeTypeOrmConn, createTypeOrmConn, openTypeOrmConn } from "../config/ormconnection";
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
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("token");
      });
  });

  test("debe responder status 401 si el usuario ingresa mal la contraseña o el username", async () => {
    await request(app)
      .post("/login")
      .send({
        username: 1233,
        password: 2546,
      })
      .expect(401)
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("message", "usuario o contraseña invalida");
      });
  });
});

afterAll(async () => {
  await closeTypeOrmConn();
  await server.close();
});
