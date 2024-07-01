// index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [empID, setEmpID] = useState('');
  const [employeeData, setEmployeeData] = useState({
    EmpID: '',
    EmpName: '',
    Designation: '',
    EmpDOJ: '',
    ManagerName: '',
    Compensation: '',
    EmpStatus: '',
  });

  const handleInputChange = (field, value) => {
    setEmployeeData({ ...employeeData, [field]: value });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.0.139:4000/employee/${empID}`);
      const data = await response.json();
      if (data) setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const createEmployee = async () => {
    try {
      const response = await fetch('http://192.168.0.139:4000/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        Alert.alert('Success', 'Employee created successfully');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      Alert.alert('Error', 'Failed to create employee');
    }
  };

  const updateEmployee = async () => {
    try {
      const response = await fetch(`http://192.168.0.139:4000/employee/${empID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        Alert.alert('Success', 'Employee updated successfully');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      Alert.alert('Error', 'Failed to update employee');
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await fetch(`http://192.168.0.139:4000/employee/${empID}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Employee deleted successfully');
        setEmployeeData({
          EmpID: '',
          EmpName: '',
          Designation: '',
          EmpDOJ: '',
          ManagerName: '',
          Compensation: '',
          EmpStatus: '',
        });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      Alert.alert('Error', 'Failed to delete employee');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter EmpID"
        value={empID}
        onChangeText={setEmpID}
      />
      <Button title="Search" onPress={fetchData} />
      <View>
        {Object.entries(employeeData).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key}:</Text>
            <TextInput
              style={styles.valueInput}
              value={value.toString()}
              onChangeText={(text) => handleInputChange(key, text)}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create" onPress={createEmployee} />
        <Button title="Update" onPress={updateEmployee} />
        <Button title="Delete" onPress={deleteEmployee} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
  },
  valueInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default App;