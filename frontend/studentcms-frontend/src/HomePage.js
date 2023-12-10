// HomePage.js
import React, { useRef } from 'react';
import axios from 'axios';

//import API_URL from './config';

const HomePage = () => {

  const totalStudents = 20; //Math.floor(Math.random() * 100);
  const totalCourses = 21; //Math.floor(Math.random() * 20);
  // const [totalStudents, setTotalStudents] = useState(0);
  // const [totalCourses, setTotalCourses] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await axios.get(`${API_URL}/total`);
  //       const response = await axios.get('/api/total');
  //       setTotalStudents(response.data.totalStudents);
  //       setTotalCourses(response.data.totalCourses);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  return (
    <div style={pageStyle}>
      <h2>Home Page</h2>
      <p>Total Students: {totalStudents}</p>
      <p>Total Courses: {totalCourses}</p>
    </div>
  );
}

// Styles
const pageStyle = {
  textAlign: 'center',
  padding: '20px',
};

export default HomePage;
