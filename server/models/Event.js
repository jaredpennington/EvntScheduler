const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const eventSchema = new Schema(
    {
        event_name: {
            type: String,
            trim: true,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        user_id: {
            type: String,
            required: true
        },
        date_windows: [[
            {
                type: String,
                required: true,
                // get: timestamp => dateFormat(timestamp),
            }
        ]],
        guests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Guest'
            }
        ],
        passwords: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Password'
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