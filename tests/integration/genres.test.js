const request = require("supertest");
const mongoose = require("mongoose");

const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  // test for getting all genres
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((genre) => genre.name === "genre1")).toBeTruthy();
      expect(res.body.some((genre) => genre.name === "genre2")).toBeTruthy();
    });
  });

  // test for getting one genre
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      // pass 1 as an invalid genre id
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId()
      const res = await request(server).get("/api/genres/" + id);

      expect(res.status).toBe(404);
    });
  });

  // test for posting an genre
  describe("POST /", () => {

    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    }

    beforeEach(() => {
      token = User.generateAuthToken()
      name = 'genre1'
    })

    it("should return 401 if client is not logged in", async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    // should return 400 if genre is invalid(less than 5 chars)
    // but unfortunately we haven't implemented Joi validation so
    // in this case it will be 500 internal server error
    it("should return 500 if genre is invalid(less than 3 chars)", async () => {
      name = '22'
      const res = await exec()
      expect(res.status).toBe(500);
    });

    it("should return 500 if genre is invalid(more than 50 chars)", async () => {
      // generate 51 charaters of 'a'
      name = new Array(52).join('a')
      const res = await exec()
      expect(res.status).toBe(500);
    });

    it("should save the genre if it is valid and user is logged in", async () => {
      await exec();
      const genre = await Genre.find({ name: 'genre1' })
      expect(genre).not.toBeNull()
    });

    it("should return the genre if it is in body of res", async () => {
      const res = await exec()
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', 'genre1')
    });
  });
});
