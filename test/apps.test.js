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
  it("should throw an error if sort does not equal options", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be on of rating or app");
  });
  it("should throw an error if genre does not equal options", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "MISTAKE" })
      .expect(400, "Genre must be one of the options");
  });
});
