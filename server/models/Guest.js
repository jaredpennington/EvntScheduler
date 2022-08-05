const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');

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
            type: mongoose.Schema.ObjectId,
            required: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        date_windows: [[
            {
                type: String,
                required: true,
            }
        ]],
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
        additional_info: {
            type: String,
            required: false
        },
    },
    {
      toJSON: {
        getters: true
      }
    }
)
const Guest = model('Guest', guestSchema);
module.exports = Guest;