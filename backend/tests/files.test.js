const request = require('supertest');
const app = require('../app.js');
const path = require('path');
const mock = require('mock-fs');

beforeEach(() => {
    mock({
        'node_modules': mock.load(path.resolve(__dirname, '../node_modules')),
        'uploads': {
            "test.jpg":"1234"
        }
    });
});

afterEach(() => {
    mock.restore();
});

describe("Get File", () => {
    test("No auth", async () => {
        const response = await request(app).get("/api/files/test.jpg")
        expect(response.statusCode).toBe(422)
    })
    test("Non existent", async () => {
        const response = await request(app).get("/api/files/nicht-vorhanden.jpg?token=12345")
        expect(response.statusCode).toBe(404)
    })
    test("Valid Header Auth", async () => {
        const response = await request(app).get("/api/files/test.jpg").set("token","1234")
        expect(response.statusCode).toBe(200)
    })
    test("Valid Query Auth", async () => {
        const response = await request(app).get("/api/files/test.jpg?token=12345")
        expect(response.statusCode).toBe(200)
    })
});

describe("Get all files of process", () => {
    test("No auth", async () => {
        const response = await request(app).get("/api/files/all")
        expect(response.statusCode).toBe(422)
    })
    test("Valid", async () => {
        const response = await request(app).get("/api/files/all").set("token","1234").set("process","1")
        expect(response.statusCode).toBe(404)
    })
});

describe("Delete file", () => {
    test("No auth", async () => {
        const response = await request(app).delete("/api/files/test.jpg")
        expect(response.statusCode).toBe(422)
    })
    test("Valid", async () => {
        const response = await request(app).delete("/api/files/test.jpg").set("token","1234")
        expect(response.statusCode).toBe(200)
    })
});

describe("Upload file", () => {
    test("No auth", async () => {
        const response = await request(app).post("/api/files")
        expect(response.statusCode).toBe(422)
    })
    test("No file", async () => {
        const response = await request(app).post("/api/files").set("token","1234")
        expect(response.statusCode).toBe(400) 
    })
    test("Valid", async () => {
        const response = await request(app).post("/api/files").set("token","1234").attach('file', 'uploads/test.jpg');
        expect(response.statusCode).toBe(201)
    })
});