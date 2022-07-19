const { User, Guest } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth.js')

const resolvers = {
    Query: {
        // user dashboard. get all events with passwords
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate({ populate: 'guests' });

                return userData;
            }

            throw new AuthenticationError('Not logged in')
        },

        // get single event and guests/passwords.

        // get single guest with all info (availability/budget)

    },
    Mutation: {
        // user sign up
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // user login 
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },

        // create event

        // update event

        // delete event (and its guests)

        // create survey passcode

        // update survey passcode

        // delete survey passcode

        // create guest

        // update guest (event planner can change availability)

        // delete guest
    },
};

module.exports = resolvers;