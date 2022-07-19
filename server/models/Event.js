const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const eventSchema = new Schema(
    {
        event_name: {
            type: String,
            trim: true,
            required: true,
        },
        host: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        bachelors_pass: {
            type: String,
            required: true,
        },
        bachelorette_pass: {
            type: String,
            required: true,
        },
        both_pass: {
            type: String,
            required: true,
        },
        date_windows: {
            type: [[Date]],
            required: true,
            get: timestamp => dateFormat(timestamp),
        },
        guests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Guest'
            }
        ]
    },
    {
      toJSON: {
        getters: true
      }
    }
)
const Event = model('Event', eventSchema);
module.exports = Event;