import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { API_URL,TOKEN, HEADERS } from './config';
import { Modal, Button, Table, Form } from 'react-bootstrap';



const AssignmentPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get(`${API_URL}/student/`);
        const coursesResponse = await axios.get(`${API_URL}/course/`);
        const assignmentsResponse = await axios.get(`${API_URL}/course/students`);

        setStudents(studentsResponse.data.data);
        setCourses(coursesResponse.data.data);
        setAssignments(assignmentsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();

    try {
    
      var response = await axios.post(`${API_URL}/course/students`, { student_id: selectedStudent, course_id: selectedCourse }, { HEADERS });
      console.log(response.data)
      //alert(response.data.message)
      toast.info(response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
      // const updatedAssignments = await axios.get(`${API_URL}/course/students/`, { HEADERS });
      // setAssignments(updatedAssignments.data);

      
      setSelectedStudent('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  };

  const handleEditClick = (assignment) => {
    setEditingAssignment(assignment);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditingAssignment(null);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {

      await axios.put(`${API_URL}/assignments/${editingAssignment.id}/`, editingAssignment, { HEADERS });
      const updatedAssignments = await axios.get(`${API_URL}/course/students/`, { HEADERS });
      setAssignments(updatedAssignments.data);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleDeleteClick = (assignment) => {
    setEditingAssignment(assignment);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setEditingAssignment(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {

      await axios.delete(`${API_URL}/assignments/${editingAssignment.id}/`, { HEADERS });
      const updatedAssignments = await axios.get(`${API_URL}/course/students/`, { HEADERS });
      setAssignments(updatedAssignments.data);

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div className="container mt-5">
    <ToastContainer />
      <h2 className="mb-4">Assignment Page</h2>

      <Form onSubmit={handleEnrollSubmit}>
        <Form.Group controlId="studentSelect">
          <Form.Label>Student:</Form.Label>
          <Form.Control as="select" value={selectedStudent} onChange={handleStudentChange} required>
            <option value="" disabled>Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>{student.first_name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="courseSelect">
          <Form.Label>Course:</Form.Label>
          <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange} required>
            <option value="" disabled>Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Enroll</Button>
      </Form>

      
      <h3 className="mt-4">Enrolled Students</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.student_id}</td>
              <td>{assignment.student_name}</td>
              <td>{assignment.course_id}</td>
              <td>{assignment.course_name}</td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(assignment)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(assignment)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
          <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={isDeleteModalOpen} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this assignment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmDelete}>OK</Button>
          <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignmentPage;
