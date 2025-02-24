const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Initialize SQLite database
let db;
(async () => {
    db = await open({
        filename: "./studentsinfo.sqlite",
        driver: sqlite3.Database,
    });
})();

// GraphQL Schema
typeDefs = gql`
    type Department {
        id: ID!
        name: String!
        address: String!
    }
    
    type Student {
        id: ID!
        first_name: String!
        last_name: String!
        student_id: String!
        address: String!
        department: Department!
    }

    type Query {
        studentsByDepartment(departmentId: ID!): [Student]
        departments: [Department]
    }

    type Mutation {
        addStudent(firstName: String!, lastName: String!, studentId: String!, address: String!, departmentId: ID!): Student
    }
`;

const resolvers = {
    Query: {
        studentsByDepartment: async (_, { departmentId }) => {
            return await db.all(
                `SELECT students.*, departments.name AS department_name, departments.address AS department_address 
                 FROM students 
                 JOIN departments ON students.department_id = departments.id 
                 WHERE departments.id = ?`, 
                [departmentId]
            );
        },
        departments: async () => {
            return await db.all("SELECT * FROM departments");
        }
    },
    
    Mutation: {
        addStudent: async (_, { firstName, lastName, studentId, address, departmentId }) => {
            const result = await db.run(
                `INSERT INTO students (first_name, last_name, student_id, address, department_id) VALUES (?, ?, ?, ?, ?)`,
                [firstName, lastName, studentId, address, departmentId]
            );
            return {
                id: result.lastID,
                first_name: firstName,
                last_name: lastName,
                student_id: studentId,
                address: address,
                department: await db.get("SELECT * FROM departments WHERE id = ?", [departmentId])
            };
        }
    },
    
    Student: {
        department: (student) => {
            return {
                id: student.department_id,
                name: student.department_name,
                address: student.department_address,
            };
        },
    },
};

// Initialize Apollo Server
async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log("Server ready at http://localhost:4000/graphql")
    );
}

startServer();
