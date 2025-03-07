const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
  type Author {
    name: String!,
    born: Int,
    id: ID!
  }

  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String!]!
  }

  type BookResult {
    title: String!,
    author: String!,
  }

  type AuthorsCount {
    name: String!,
    born: Int,
    bookCount: Int!,
  }

  type Query {
    allBooks(genre: String, author: String): [Book]!,
    allAuthors: [AuthorsCount]!,
    bookCount: Int,
    authorCount: Int
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int,
      genres: [String]
    ): Book
    addAuthor(
      name: String!,
      born: Int
    ): Author
    editAuthor(
      name: String!,
      setBornTo: Int
    ): Author
  }
`

const buildAuthor = (name, born) => {
  const newAuthor = {
    name,
    born: born ? born : null,
    id: uuid()
  }
  return newAuthor
}


const resolvers = {
  Query: {
    allBooks: (root, args) => {
      let result = books

      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre))
      }
      if (args.author) {
        result = result.filter(book => (book.author === args.author))
      }

      return result
    },
    allAuthors: () => {
      return authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: books.reduce((total, book) => (author.name === book.author) ? total + 1 : total, 0)
        }
      })
    },
    bookCount: () => books.length,
    authorCount: () => authors.length,
  },
  Mutation: {
    addBook: (root, args) => {
      const authorSent = args.author

      if (!authors.find(author => author.name === authorSent)) {
        authors = authors.concat(buildAuthor(authorSent))
      }
      const newBook = { ...args, id: uuid() }
      books = books.concat(newBook)
      return newBook
    },
    addAuthor: (root, args) => {
      const { name, born } = args
      const newAuthor = buildAuthor(name, born)
      authors = authors.concat(newAuthor)
      return newAuthor
    },
    editAuthor: (root, args) => {
      const { name, setBornTo: born } = args
      const authorFound = authors.find(author => author.name === name)

      if (!authorFound) {
        return null
      }

      const updatedAuthor = { name, born }
      authors = authors.map(author => author.name === name ? updatedAuthor : author)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})