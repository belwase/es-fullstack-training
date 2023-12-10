// StudentsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from './config';


const StudentsPage = () => {
  
  const [students, setStudents] = useState(0);
  
  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/student`);
          console.log(response.data.data)
          setStudents(response.data.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();


  }, []);

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
       {/* <tbody>
          {students.map(student => (
            <tr key={student.id} style={{ 
              backgroundColor: student.age > 20 ? 'green' : 'inherit' }}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>*/}
      </table>
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
