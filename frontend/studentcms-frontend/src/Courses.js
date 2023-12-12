// CoursesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from './config';

const CoursesPage = () => {
  // Generate random data for demonstration
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    
      const fetchCourses = async () => {
        try {
          const response = await axios.get(`${API_URL}/course/`);
          setCourses(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`${API_URL}/student/`);
          setStudents(response.data.data);
          console.log(students)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    fetchCourses();
    fetchStudents();
  }, []);

  const onStudentChange = (e) => {
    setSelectedStudent(e.target.value)
  }

  const onCourseChange = (e) => {
    setSelectedCourse(e.target.value)
  }

  const AddAssignment = (e) => {
    e.preventDefault();
    
    const Add = async () => {
      try{

        var headers = {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6InJhbSJ9.ZlRJryXSibFMHwtWEPLCqXNjS3NGD415Gub0lQPt474',
          'Content-Type': 'application/json'
        }

        var payload = {
          "student_id": selectedStudent,
          "course_id": selectedCourse
        };
        var response = await axios.post(
            `${API_URL}/student-assignment/`,
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
          toast.success("Student-Assignment Added !", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        
        console.log(response)
        

      }catch(err){
        console.log("Got error ", err)
      }

    }

    Add()
    

  }
  

  return (
    <div style={pageStyle}>
      <h2>Courses Page</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div class="col-md-6">
            <h2>Assignment Form</h2>
            <form onSubmit="AddAssignment">
                <div class="mb-3">
                    <label for="studentDropdown" class="form-label">Select Student</label>
                    <select class="form-select" id="student_id" name="student" onChange="onStudentChange">
                       {students.map(student => (
                          <option value={ student.id }>{student.first_name}</option>
                        ))}
                            
                     
                    </select>
                </div>
                <div class="mb-3">
                    <label for="courseDropdown" class="form-label">Select Course</label>
                    <select class="form-select" id="course_id" name="course"  onChange="onCourseChange">
                        {courses.map(course => (
                          <option value={ course.id }>{course.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Assign Course</button>
            </form>
        </div>

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

export default CoursesPage;
