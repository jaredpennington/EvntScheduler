const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const passwordSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        event_id: {
            type: mongoose.Schema.ObjectId,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)
const Password = model('Password', passwordSchema);
module.exports = Password;