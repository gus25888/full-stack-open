const { GraphQLError } = require('graphql')

const Book = require('../models/Book')
const Author = require('../models/Author')

const createAuthor = async (name, born) => {
  const NAME_LENGTH = 4
  if (name.length < NAME_LENGTH) {
    throw new GraphQLError('Creating author failed. Name Length must be at least ' + NAME_LENGTH + ' characters.', {
      extensions: {
        code: 'BAD_USER_INPUT',
        argumentName: name,
      }
    })
  }

  const newAuthor = new Author({ name, born: born || null })
  try {
    await newAuthor.save()
  } catch (error) {
    throw new GraphQLError('Creating author failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: name,
        error
      }
    })
  }
  return newAuthor
}

const resolvers = {

  Query: {
    allBooks: async (root, args) => {
      let filter = {}
      if (args.genre) {
        filter.genres = args.genre
      }
      // if (args.author) {
      //   filter.author = args.genre
      // }
      return await Book.find(filter).populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author', { name: 1 })

      return authors.map((author) => {
        const { name, born } = author
        return {
          name,
          born,
          bookCount: books.reduce((total, book) => (name === book.author.name) ? total + 1 : total, 0)
        }
      })
    },
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
  },

  Mutation: {
    addBook: async (root, args) => {
      const { title, published, author, genres } = args

      const TITLE_LENGTH = 2
      if (title.length < TITLE_LENGTH) {
        throw new GraphQLError('Creating book failed. Title length must be at least ' + TITLE_LENGTH + ' characters.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: title,
          }
        })
      }
      const authorFound = await Author.findOne({ name: author })

      // If Author is not found, it's created.
      const bookAuthor = authorFound || await createAuthor(author, null)

      const newBook = new Book({ title, published, author: bookAuthor, genres })

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Creating book failed: wrong data', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [title, author],
            error
          }
        })
      }

      return newBook
    },
    addAuthor: (root, args) => {
      const { name, born } = args.author
      return createAuthor(name, born)
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo: born } = args

      const authorFound = await Author.findOne({ name })

      if (!authorFound) {
        throw new GraphQLError('Editing failed: Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const authorToUpdate = {
        ...authorFound,
        name,
        born: born || null
      }

      try {

        await Author.findByIdAndUpdate(
          authorFound.id,
          authorToUpdate,
          { new: true, runValidators: true, context: 'query' }
        )

      } catch (error) {
        throw new GraphQLError('Editing Author failed: wrong data', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: born,
            error
          }
        })
      }

      return authorToUpdate

    }
  }
}


module.exports = resolvers