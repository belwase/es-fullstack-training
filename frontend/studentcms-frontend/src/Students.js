// StudentsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from './config';


const StudentsPage = () => {
  
  const [students, setStudents] = useState([]);
  var [newStudent, setNewStudent] = useState({
              first_name:'',
              last_name: '',
              email: '',
              password: '',
              phone: ''
            })
  
  useEffect(() => {
    console.log("initialized.")
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/student/`);
          console.log(response.data.data)
          setStudents(response.data.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();


  }, []);

  const handleAddStudent = (e) => {

  }

  const handleInputChange = (e) => {
    var field_name = e.target.name;
    var field_value = e.target.value;
    console.log(field_name, field_value);
    

  }

  return (
    <div style={pageStyle}>
      <h2>Students Page</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} style={{ 
              backgroundColor: student.age > 20 ? 'green' : 'inherit' }}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddStudent}>
        <label>
          First Name:
          <input type="text" name="first_name" value={newStudent.first_name} onChange={handleInputChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={newStudent.last_name} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={newStudent.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={newStudent.password} onChange={handleInputChange} required />
        </label>
        <label>
          Phone:
          <input type="number" name="phone" value={newStudent.phone} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

// Styles
const pageStyle = {
  textAlign: 'center',
  padding: '20px',
};

const tableStyle = {
  width: '80%',
  margin: '20px auto',
  borderCollapse: 'collapse',
};

export default StudentsPage;
