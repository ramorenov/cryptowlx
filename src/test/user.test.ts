import { closeTypeOrmConn, createTypeOrmConn, openTypeOrmConn } from "../config/ormconnection";
import { IUserR } from "../interfaces/interfaces";

const request = require("supertest");
const { app, server } = require("../index");

beforeAll(async () => {
  await createTypeOrmConn();
  await openTypeOrmConn();
});

describe("GET /users", () => {
  test("debe responder lista de usuarios con status 200 ", async () => {
    await request(app).get("/users").expect("Content-Type", /json/).expect(200);
  });
});

describe("POST /users", () => {
  test("debe responder los datos del nuevo usuario con status 201 al crear", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "ricardo",
        last_name: "moreno",
        username: "ramorenov",
        password: "A123456a",
        pref_currency: "eur",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res: { body: IUserR }) => {
        expect(res.body).toHaveProperty("data");
      });
  });

  test("debe responder status 400 si se intenta crear un usuario con algun campo faltante", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        //name: "ricardo",
        last_name: "moreno",
        username: "ramorenov",
        password: "A123456a",
        pref_currency: "eur",
      })
      .expect(400);
  });

  test("debe responder status 400 si la contraseña no es alfanumerica", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        name: "ricardo",
        last_name: "moreno",
        username: "ramorenov",
        password: "123456",
        pref_currency: "eur",
      })
      .expect(400);
  });
});

afterAll(async () => {
  await closeTypeOrmConn();
  await server.close();
});
