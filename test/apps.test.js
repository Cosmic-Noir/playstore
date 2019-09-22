const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("Express App", () => {
  it("should return a message from GET /apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200);
  });
  it("should return an array", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
      });
  });
});
