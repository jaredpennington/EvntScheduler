const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const plannerSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
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
        }
        date_windows: {
            type: [[Date]],
            required: true,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Planner = model('Planner', plannerSchema);

module.exports = Planner;