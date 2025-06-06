const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, minLength: 1, required: [true, 'content is required'] },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)