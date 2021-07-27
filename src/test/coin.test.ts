import { closeTypeOrmConn, createTypeOrmConn, openTypeOrmConn } from "../config/ormconnection";

const request = require("supertest");
const { app, server } = require("../index");
let token = "";

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

beforeEach(async () => {
  token = await request(app)
    .post("/login")
    .send({
      username: "ramorenov",
      password: "A123456a",
    })
    .then((res: { body: { token: string } }) => {
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
      .then((res: Body) => {
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
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "Ingrese el tipo de moneda preferido entre usd, euro, ars");
      });
  });
});

describe("POST /coins", () => {
  test("debe responder status 500 si el usuario no tiene monedas guardadas", async () => {
    await request(app)
      .get("/coins/top")
      .set("Authorization", `Bearer ${token}`)
      .query({
        top_n: 20,
        order: "asc",
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "el usuario no tiene monedas");
      });
  });

  test("debe responder status 200 al guardar una moneda existente en coingecko", async () => {
    await request(app)
      .post("/coins")
      .set("Authorization", `Bearer ${token}`)
      .send({
        coin_id: "dogecoin",
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("POST /coins", () => {
  test("debe responder status 500 al guardar una moneda no existente en coingecko", async () => {
    await request(app)
      .post("/coins")
      .set("Authorization", `Bearer ${token}`)
      .send({
        coin_id: "woloxcoin",
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "la moneda que intenta guardar no existe");
      });
  });
});

describe("GET /coins/top", () => {
  test("debe responder con status 401 no autorizado, si el usuario no esta logeado", async () => {
    await request(app)
      .get("/coins/top")
      .set("Authorization", null)
      .query({
        top_n: 20,
        order: "asc",
      })
      .expect("Content-Type", /json/)
      .expect(401);
  });
  test("debe responder el top de criptomonedas del usuario con status 200", async () => {
    await request(app)
      .get("/coins/top")
      .set("Authorization", `Bearer ${token}`)
      .query({
        top_n: 20,
        order: "asc",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("data");
      });
  });

  test("debe responder status 400 si el param top N esta fuera del rango 1-25", async () => {
    await request(app)
      .get("/coins/top")
      .set("Authorization", `Bearer ${token}`)
      .query({
        top_n: 50,
        order: "asc",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res: Body) => {
        expect(res.body).toHaveProperty("message", "Ingrese un numero entero entre 1 y 25");
      });
  });
});

afterAll(async () => {
  await closeTypeOrmConn();
  await server.close();
});
