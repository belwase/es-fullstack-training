// CoursesPage.js
import React, { useRef } from 'react';

const CoursesPage = () => {
  // Generate random data for demonstration
  const courses = [
    { id: 101, title: 'React Basics', instructor: 'John Smith' },
    { id: 102, title: 'JavaScript Fundamentals', instructor: 'Jane Doe' },
    { id: 103, title: 'Web Development with HTML/CSS', instructor: 'Bob Johnson' },
  ];

  return (
    <div style={pageStyle}>
      <h2>Courses Page</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.instructor}</td>
            </tr>
          ))}
        </tbody>
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

export default CoursesPage;
