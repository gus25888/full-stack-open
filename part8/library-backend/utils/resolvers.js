const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const { JWT_SECRET } = require('../utils/config')

const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const pubsub = new PubSub()

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
      //   filter.author = args.author
      // }
      return await Book.find(filter).populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => {
      const authors = await Author.find({})

      return authors.map((author) => {
        const { name, born, books } = author
        return {
          name,
          born,
          bookCount: books.length
        }
      })
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    me: (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      return currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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
        const savedBook = await newBook.save()
        bookAuthor.books = bookAuthor.books.concat(savedBook._id)
        await bookAuthor.save()
      } catch (error) {
        throw new GraphQLError('Creating book failed: wrong data', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [title, author],
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    addAuthor: (root, args) => {
      const { name, born } = args
      return createAuthor(name, born)
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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
        id: authorFound.id,
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

    },

    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({ username, favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: [username, favoriteGenre],
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  },


  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
    },
  },
}


module.exports = resolvers