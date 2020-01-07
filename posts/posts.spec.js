const request = require("supertest");
const server = require("../api/server");

describe("posts-router", () => {
  let token = null;

  beforeEach(done => {
    request(server)
      .post("/api/chefs/login")
      .send({
        username: "ChefTimmy123",
        password: "pass"
      })
      .end((req, res) => {
        token = res.body.token;
        done();
      });
  });

  it("should GET a list of all posts", async () => {
    await request(server)
      .get("/api/chefs/posts")
      .set("authorization", token)
      .expect(200);
  });
  it("should GET a specific post", async () => {
    await request(server)
      .get("/api/chefs/posts/1")
      .set("authorization", token)
      .expect(200);
  });
  it("should PUT a post update", async () => {
    await request(server)
      .put("/api/chefs/posts/1")
      .set("authorization", token)
      .send({
        id: 1,
        imageUrl:
          "https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg",
        title: "Test Recipe",
        meal_type: "breakfast",
        ingredients: "eggs, bacon, sausage",
        instructions: "step 1: something, step 2: something else, etc",
        chef_id: 1
      })
      .expect(200);
  });
  it("should DELETE a category", async () => {
    await request(server)
      .delete("/api/chefs/posts/1")
      .set("authorization", token)
      .expect(200);
  });
});