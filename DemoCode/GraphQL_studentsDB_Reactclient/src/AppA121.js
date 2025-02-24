import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
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

const DepartmentSelection = ({ onSelect }) => {
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error fetching departments</p>;

  return (
    <div>
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
      <br />
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
    <div>
      <br></br>
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

const App = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>Student Information System</h1>
      <DepartmentSelection onSelect={setSelectedDepartment} />
      {selectedDepartment && <StudentList departmentId={selectedDepartment} />}
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
