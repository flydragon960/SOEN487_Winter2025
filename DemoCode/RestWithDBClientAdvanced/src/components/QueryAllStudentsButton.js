import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QueryAllStudentsButton = () => {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStudents = async (page) => {
    try {
      console.log('Fetching students for page:', page); // Debug log
      const response = await axios.get(`http://localhost:3100/api/students_paged`, {
        params: { page, limit: 10 },
      });
      console.log('in QueryAllStudentsButton Fetched students:', response.data);
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage); // Fetch students when the page changes
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Students List</h1>
      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
              margin: '0 5px',
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QueryAllStudentsButton;
