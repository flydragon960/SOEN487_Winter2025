import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { Sequelize, DataTypes } from 'sequelize';

// Set up SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Define the Book model
const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
});

// Initialize the database
(async () => {
  await sequelize.sync({ force: true }); // Recreate tables on every restart
  await Book.bulkCreate([
    { title: '1984', author: 'George Orwell' },
    { title: 'Brave New World', author: 'Aldous Huxley' },
  ]);
})();

// Define the GraphQL schema
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

// Define resolvers
const root = {
  books: async () => await Book.findAll(),
  book: async ({ id }) => await Book.findByPk(id),
  addBook: async ({ title, author }) => {
    const newBook = await Book.create({ title, author });
    return newBook;
  },
};

// Set up Express server
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
