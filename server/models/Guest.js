const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const guestSchema = new Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true
        },
        event_id: {
            type: String,
            required: true
        },
        date_windows: {
            type: [String],
            trim: true,
            get: timestamp => dateFormat(timestamp)
        },
        completedAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        budget: {
            type: Number,
            trim: true,
            required: true
        },
        invited_to: {
            type: String,
            trim: true,
            required: true

        }
    },
    {
      toJSON: {
        getters: true
      }
    }
)
const Guest = model('Guest', guestSchema);
module.exports = Guest;