import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const GET_DEPARTMENTS = gql`
  query {
    departments {
      id
      name
    }
  }
`;

const GET_STUDENTS_BY_DEPARTMENT = gql`
  query ($departmentId: ID!) {
    studentsByDepartment(departmentId: $departmentId) {
      id
      first_name
      last_name
      student_id
      address
    }
  }
`;

const ADD_STUDENT = gql`
  mutation ($firstName: String!, $lastName: String!, $studentId: String!, $address: String!, $departmentId: ID!) {
    addStudent(firstName: $firstName, lastName: $lastName, studentId: $studentId, address: $address, departmentId: $departmentId) {
      id
      first_name
      last_name
    }
  }
`;

const DepartmentSelection = ({ onSelect }) => {
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error fetching departments</p>;

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Select a Department</h2>
      {data.departments.map((dept) => (
        <div key={dept.id}>
          <input
            type="radio"
            id={dept.id}
            name="department"
            value={dept.id}
            onChange={() => setSelectedDepartment(dept.id)}
          />
          <label htmlFor={dept.id}>{dept.name}</label>
        </div>
      ))}
      <button onClick={() => onSelect(selectedDepartment)} disabled={!selectedDepartment}>
        Submit
      </button>
    </div>
  );
};

const StudentList = ({ departmentId }) => {
  const { loading, error, data } = useQuery(GET_STUDENTS_BY_DEPARTMENT, {
    variables: { departmentId },
    skip: !departmentId,
  });

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error fetching students</p>;
  if (!data || data.studentsByDepartment.length === 0) return <p>No students found.</p>;

  return (
    <div style={{ marginLeft: '20px' }}>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.studentsByDepartment.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.student_id}</td>
              <td>{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [address, setAddress] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);
  const [addStudent] = useMutation(ADD_STUDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent({ variables: { firstName, lastName, studentId, address, departmentId } });
    alert("Student added successfully!");
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="text" placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} required />
        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
        <select onChange={(e) => setDepartmentId(e.target.value)} required>
          <option value="">Select Department</option>
          {data?.departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

const App = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>Student Information System</h1>
      <DepartmentSelection onSelect={setSelectedDepartment} />
      {selectedDepartment && <StudentList departmentId={selectedDepartment} />}
      <AddStudentForm />
    </div>
  );
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
