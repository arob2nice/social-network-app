const { Schema, Types } = require('mongoose');
// const moment = require('moment');

// Reaction Schema (Subdocument for Thought Model)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: any) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = { reactionSchema };
