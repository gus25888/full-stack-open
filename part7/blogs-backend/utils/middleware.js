const jwt = require('jsonwebtoken')

const logger = require('./logger')
const { User } = require('../models/user')
const { SECRET } = require('../utils/config')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id with invalid format' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

const userExtractor = async (request, response, next) => {
  const validatedMethods = ['POST', 'DELETE']

  if (validatedMethods.includes(request.method)) {
    const auth = request.get('authorization')
    const token = (auth && auth.startsWith('Bearer ')) ? auth.replace('Bearer ', '') : null

    if (!token) {
      return response.status(401).json({ error: 'token not found' })
    }

    try {
      const decodedToken = jwt.verify(token, SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Verified: token not valid' })
      }
      const user = await User.findById(decodedToken.id)

      if (!user) {
        return response.status(401).json({ error: 'user not found' })
      }
      request.user = user
    } catch (error) {
      logger.error({ error })
      return response.status(401).json({ error: 'token invalid' })
    }
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}