const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
jest.mock('mysql');

const app = express();
app.use(bodyParser.json());

// Include the routes from server.js here
// This might require refactoring server.js to export the app or routes

describe('API endpoints', () => {
  let connection;

  beforeAll(() => {
    connection = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn()
    };
    mysql.createConnection.mockReturnValue(connection);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /employee/:empId - success', async () => {
    const mockEmployee = {"EmpID":12346,"EmpName":"Tom Erichsen1","Designation":"SWE21","EmpDOJ":"8/10/2021","ManagerName":"Shiva Muralidhar1","Compensation":"1040001","EmpStatus":"Active1"};
    connection.query.mockImplementation((query, values, callback) => callback(null, [mockEmployee]));
    //console.log('connection.queryy', connection.query.EmpID);

    const response = await request(app).get('/employee/12346');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockEmployee);
    expect(connection.query).toHaveBeenCalled();
  });

  test('GET /employee/:empId - not found', async () => {
    connection.query.mockImplementation((query, values, callback) => callback(null, []));

    const response = await request(app).get('/employee/999');
    expect(response.statusCode).toBe(404);
    expect(connection.query).toHaveBeenCalled();
  });

  test('POST /employee - success', async () => {
    connection.query.mockImplementation((query, values, callback) => callback(null, { insertId: 1 }));

    const newEmployee = {
      EmpID: '123',
      EmpName: 'Jane Doe',
      Designation: 'Developer',
      EmpDOJ: '2020-01-01',
      ManagerName: 'John Doe',
      Compensation: '100000',
      EmpStatus: 'Active'
    };

    const response = await request(app).post('/employee').send(newEmployee);
    expect(response.statusCode).toBe(201);
    expect(connection.query).toHaveBeenCalled();
  });

  // Add more tests for PUT /employee/:empId and DELETE /employee/:empId
});