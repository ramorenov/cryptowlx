import { createTypeOrmConn } from "../config/ormconnection";

const request = require("supertest");
const { app, server } = require("../index");

beforeAll(async () => {
  await createTypeOrmConn();
});
let token = "";
beforeEach(async () => {
  token = await request(app)
    .post("/login")
    .send({
      username: "ramorenov",
      password: "A123456a",
    })
    .then((res: { body: any }) => {
      //console.log(res.body.token);
      return res.body.token;
    });
});

describe("GET /coins", () => {
  test("debe responder con status 401 no autorizado, si el usuario no esta logeado", async () => {
    await request(app)
      .get("/coins")
      .set("Authorization", null)
      .query({
        vs_currency: "usd",
        per_page: 100,
        page: 1,
      })
      .expect("Content-Type", /json/)
      .expect(401);
  });
  test("debe responder el listado de criptomonedas con status 200", async () => {
    await request(app)
      .get("/coins")
      .set("Authorization", `Bearer ${token}`)
      .query({
        vs_currency: "usd",
        per_page: 100,
        page: 1,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("data");
      });
  });

  test("debe responder status 400 si la moneda preferida es diferente de usd, eur o ars", async () => {
    await request(app)
      .get("/coins")
      .set("Authorization", `Bearer ${token}`)
      .query({
        vs_currency: "aud",
        per_page: 100,
        page: 1,
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res: { body: any }) => {
        expect(res.body).toHaveProperty("message", "Ingrese el tipo de moneda preferido entre usd, euro, ars");
      });
  });
});

afterAll(async () => {
  await server.close();
});
