/*
unit test sytax
describe("user handler", () => {
  it("should do a thing", async () => {
    // .,...

    expect("something").toBe("something");
  });
});
*/

import * as user from "../user";
//Test for creating a new user
describe("user handler", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "hello", password: "hi" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createUser(req, res, () => {});
  });
});
