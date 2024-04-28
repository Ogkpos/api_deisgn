/*
integration test syntax
import app from "../server";
import request from "supertest";

describe("POST /user", function () {
  it("responds with json", async () {
    const res = await request(app)
      .post("/user")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json")

    expect(res.headers["Content-Type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
  });
});
*/

import app from "../server";
import supertest from "supertest";

describe("GET /", function () {
  it("responds with message", async () => {
    const res = await supertest(app).get("/");

    expect(res.body.message).toBe("hello");
  });
});
