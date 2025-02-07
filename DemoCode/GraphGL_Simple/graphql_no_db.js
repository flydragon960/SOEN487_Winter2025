// Import necessary modules
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Define the GraphQL Schema
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`);

// Sample data
let books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

// Resolvers
const root = {
  books: () => books,
  book: ({ id }) => books.find((book) => book.id === id),
  addBook: ({ title, author }) => {
    const newBook = { id: String(books.length + 1), title, author };
    books.push(newBook);
    return newBook;
  },
};

// Setup Express Server
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables GraphiQL UI
  })
);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
