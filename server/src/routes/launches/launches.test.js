const { app } = require("../../app.js");
const request = require("supertest");

describe("Test GET /api/launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/api/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /api/launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "zoot",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/api/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/api/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    console.log("body is ", response.body);
    expect(response.body).toStrictEqual({
      error: " Invalid launch ",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/api/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: " Invalid launch ",
    });
  });
});
describe("Test DELETE /api/launches/:id", () => {
  test("It should respond with 200 if launch aborted successfully", async () => {
    const launchIdToAbort = 100;

    const response = await request(app)
      .delete(`/api/launches/${launchIdToAbort}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toMatchObject({
    flightNumber: 100,
    success: false,
    upcoming: false,
});

  });

  test("It should respond with 404 if launch not found", async () => {
    const invalidLaunchId = 9999;

    const response = await request(app)
      .delete(`/api/launches/${invalidLaunchId}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: "launch not found",
    });
  });
});
