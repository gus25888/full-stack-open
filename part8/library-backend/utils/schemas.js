const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type BookResult {
    title: String!
    author: String!
  }

  type AuthorsCount {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    allBooks(genre: String, author: String): [Book]!
    allAuthors: [AuthorsCount]!
    bookCount: Int
    authorCount: Int
  }


  input AuthorInput {
    name: String!
    born: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book!

    addAuthor(
      author: AuthorInput!
    ): Author!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author!
  }
`

module.exports = typeDefs