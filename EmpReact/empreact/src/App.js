import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [empID, setEmpID] = useState('');
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/employee/${empID}`);
      setEmployeeData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (isUpdate = false) => {
    const url = `http://localhost:4000/employee${isUpdate ? `/${empID}` : ''}`;
    const method = isUpdate ? 'put' : 'post';
    try {
      await axios[method](url, employeeData);
      alert(`Employee ${isUpdate ? 'updated' : 'created'} successfully`);
    } catch (err) {
      setError(`Failed to ${isUpdate ? 'update' : 'create'} employee`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/employee/${empID}`);
      alert('Employee deleted successfully');
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <input
        type="text"
        value={empID}
        onChange={(e) => setEmpID(e.target.value)}
        placeholder="Enter Employee ID"
      />
      <button onClick={fetchEmployeeData} disabled={loading}>
        Search
      </button>
      {error && <p>{error}</p>}
      <table>
        <tbody>
          {Object.entries(employeeData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleCreateOrUpdate(false)}>Create</button>
      <button onClick={() => handleCreateOrUpdate(true)}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default App;