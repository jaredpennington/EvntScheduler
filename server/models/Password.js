const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

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