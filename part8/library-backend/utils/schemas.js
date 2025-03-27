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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
  }


  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book!

    addAuthor(
      name: String!
      born: Int
    ): Author!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author!

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs