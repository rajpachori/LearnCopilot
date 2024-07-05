const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Or@clepwdf0rme',
    database: 'employee'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Define the GET /employee/:empId route
app.get('/employee/:empId', (req, res) => {
    const { empId } = req.params;
    const query = 'SELECT * FROM employeeinfo WHERE EmpID = ?'; // Assuming SQL and a table named Employees
  
    connection.query(query, [empId], (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error');
      }
      if (results.length > 0) {
        return res.status(200).json(results[0]);
      } else {
        return res.status(404).send('Employee not available');
      }
    });
  });

// Create Employee
app.post('/employee', (req, res) => {
    const { EmpID, EmpName, Designation, EmpDOJ, ManagerName, Compensation, EmpStatus } = req.body;
    const query = 'INSERT INTO employeeinfo (EmpID, EmpName, Designation, EmpDOJ, ManagerName, Compensation, EmpStatus) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [EmpID, EmpName, Designation, EmpDOJ, ManagerName, Compensation, EmpStatus], (error, results) => {
        if (error) {
            console.error('Error creating employee:', error);
            res.status(500).send({ message: 'Error creating employee' });
            return;
        }
        res.status(201).send({ message: 'Employee created successfully', employeeId: results.insertId });
    });
});

// Update Employee
app.put('/employee/:empId', (req, res) => {
    const empId = req.params.empId;
    const { EmpName, Designation, EmpDOJ, ManagerName, Compensation, EmpStatus } = req.body;

    // Initialize parts of the query
    let query = 'UPDATE employeeinfo SET ';
    const fieldsToUpdate = [];
    const values = [];

    // Dynamically add fields to update
    if (EmpName) {
        fieldsToUpdate.push('EmpName = ?');
        values.push(EmpName);
    }
    if (Designation) {
        fieldsToUpdate.push('Designation = ?');
        values.push(Designation);
    }
    if (EmpDOJ) {
        fieldsToUpdate.push('EmpDOJ = ?');
        values.push(EmpDOJ);
    }
    if (ManagerName) {
        fieldsToUpdate.push('ManagerName = ?');
        values.push(ManagerName);
    }
    if (Compensation) {
        fieldsToUpdate.push('Compensation = ?');
        values.push(Compensation);
    }
    if (EmpStatus) {
        fieldsToUpdate.push('EmpStatus = ?');
        values.push(EmpStatus);
    }

    // Check if there are fields to update
    if (fieldsToUpdate.length === 0) {
        res.status(400).send({ message: 'No fields to update' });
        return;
    }

    // Complete the query
    query += fieldsToUpdate.join(', ') + ' WHERE EmpID = ?';
    values.push(empId);

    // Execute the query
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating employee:', error);
            res.status(500).send({ message: 'Error updating employee' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Employee not found' });
            return;
        }
        res.send({ message: 'Employee updated successfully' });
    });
});

// Delete Employee
app.delete('/employee/:empId', (req, res) => {
    const empId = req.params.empId;
    const query = 'DELETE FROM employeeinfo WHERE EmpID = ?';
    connection.query(query, [empId], (error, results) => {
        if (error) {
            console.error('Error deleting employee:', error);
            res.status(500).send({ message: 'Error deleting employee' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Employee not found' });
            return;
        }
        res.send({ message: 'Employee deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
