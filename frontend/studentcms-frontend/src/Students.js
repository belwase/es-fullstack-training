// StudentsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import {API_URL} from './config';


const StudentsPage = () => {
  
  const [students, setStudents] = useState([]);
  var [newStudent, setNewStudent] = useState({
              first_name:'',
              last_name: '',
              email: '',
              password: '',
              phone: ''
            })

  //const notify = () => { toast("Student Added !" ) };
  
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
    e.preventDefault();
    
    const AddStudent = async () => {
      try{

        var headers = {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6InJhbSJ9.ZlRJryXSibFMHwtWEPLCqXNjS3NGD415Gub0lQPt474',
          'Content-Type': 'application/json'
        }

        var payload = newStudent;
        var response = await axios.post(
            `${API_URL}/student/`,
            payload,
            {headers: headers}
            )

        if(response.data.data == null){
          var error = "";
          let i = 0;
          for(i=0;i<response.data.messages.length;i++){
            error += response.data.messages[i] + '. ';
          }
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
          });
        }else{
          toast.success("Student Added !", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        
        console.log(response)
        

      }catch(err){
        console.log("Got error ", err)
      }

    }

    AddStudent()
    

  }


  const handleInputChange = (e) => {
    var field_name = e.target.name;
    var field_value = e.target.value;
    console.log(field_name, field_value);
    setNewStudent((prevStudent) => ({ ...prevStudent, [field_name]: field_value }));
    console.log(newStudent)

  }

  return (
    <>
    <ToastContainer />
    <div style={styles.page}>
      <h2 style={styles.heading}>Students Page</h2>
      <table className="table" style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}
                style={{
                ...styles.tableRow,
                backgroundColor: student.age > 20 ? 'green' : 'inherit',
                color: student.age > 20 ? 'white' : 'inherit',
              }}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddStudent} style={{ marginTop: '20px' }}>
        <label  style={styles.formLabel}>
          First Name:
          <input type="text" name="first_name" value={newStudent.first_name} onChange={handleInputChange} required />
        </label>
        <label  style={styles.formLabel}>
          Last Name:
          <input type="text" name="last_name" value={newStudent.last_name} onChange={handleInputChange} required />
        </label>
        <label  style={styles.formLabel}>
          Email:
          <input type="text" name="email" value={newStudent.email} onChange={handleInputChange} required />
        </label>
        <label  style={styles.formLabel}>
          Password:
          <input type="text" name="password" value={newStudent.password} onChange={handleInputChange} required />
        </label>
        <label  style={styles.formLabel}>
          Phone:
          <input type="number" name="phone" value={newStudent.phone} onChange={handleInputChange} required />
        </label>
        <button type="submit" style={styles.addButton}>
          Add Student
        </button>
      </form>
    </div>

    </>
  );
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  },
  heading: {
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableRow: {
    padding: '10px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  },
  formInput: {
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  addButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
  },
};

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
