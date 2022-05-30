const request = require('supertest');
const fs = require('memfs');
const app = require('../app.js');
const path = require('path');
const mock = require('mock-fs');

mock({
    'node_modules': mock.load(path.resolve(__dirname, '../node_modules')),
    'uploads': {
        "test.jpg":"1234"
    }
});

describe("Get File", () => {
    test("Get file - No auth", async () => {
        const response = await request(app).get("/api/files/test.jpg").send({})
        expect(response.statusCode).toBe(422)
    })
    test("Get file - Non existent", async () => {
        const response = await request(app).get("/api/files/nicht-vorhanden.jpg?token=12345").send()
        expect(response.statusCode).toBe(404)
    })
    test("Get file - Valid", async () => {
        const response = await (await request(app).get("/api/files/test.jpg?token=12345").send({}))
        expect(response.statusCode).toBe(200)
        mock.restore();
    })
});