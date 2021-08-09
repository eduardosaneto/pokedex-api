import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import * as userFactory from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should answer status 201 for a new user registered", async () => {
    const users = await userFactory.getAllUsers();
    const response = await test.post("/sign-up").send({ email: "test@email.com", password: "123456", confirmPassword: "123456" });
    const newUsers = await userFactory.getAllUsers();
    expect(users.length).toBe(newUsers.length - 1);
    expect(response.status).toBe(201);
  });

  it("should answer status 400 for a missing email", async () => {
    const response = await test.post("/sign-up").send({ email: "", password: "123456", confirmPassword: "123456" });
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for a missing password", async () => {
    const response = await test.post("/sign-up").send({ email: "test@test.com", password: "", confirmPassword: "" });
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for an invalid password confirmation", async () => {
    const response = await test.post("/sign-up").send({ email: "test@test.com", password: "1234", confirmPassword: "1233" });
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for invalid email", async () => {
    const response = await test.post("/sign-up").send({ email: "test.emai.com", password: "123456", confirmPassword: "123456" });
    expect(response.status).toBe(400);

  }); 
});

describe("POST /sign-in", () => {
  it("should answer status 200 for a sucessful login", async () => {
    const user = await userFactory.createUser();
    const response = await test.post("/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
});

  it("should answer status 401 for incorrect email", async () => {
    const user = await userFactory.createUser();
    const response = await test.post("/sign-in").send({ email: "test2@email.com", password: user.password });
    expect(response.status).toBe(401);
  });

  it("should answer status 401 for incorrect password", async () => {
    const user = await userFactory.createUser();    
    const response = await test.post("/sign-in").send({ email: user.email, password: "abcdefghi" });
    expect(response.status).toBe(401);
  });

});