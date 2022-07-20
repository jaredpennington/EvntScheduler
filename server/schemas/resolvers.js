const { User, Guest, Event, Password } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth.js')

const resolvers = {
    Query: {
        // user dashboard. get all events with passwords
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate({ path: 'events', populate: 'guests' })
                    .populate({ path: 'events', populate: 'passwords' });

                return userData;
            }

            throw new AuthenticationError('Not logged in')
        },

        // get single event and guests/passwords.
        event: async (parent, { _id }, context) => {
            if (context.user) {
                const singleEvent = await Event.findById(_id)
                    .populate('guests')
                    .populate('passwords');

                return singleEvent;
            }
        }

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
        addEvent: async (parent, args, context) => {
            if (context.user) {
                const event = await Event.create({ ...args, user_id: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: event } },
                    { new: true }
                )
                return event;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // update event
        updateEvent: async (parent, args, context) => {
            if (context.user) {
                const updatedEvent = await Event.findByIdAndUpdate(
                    { _id: args._id },
                    { ...args },
                    { new: true }
                );
                return updatedEvent;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // delete event (and its guests)
        removeEvent: async (parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { events: _id } },
                    { new: true }
                );

                // delete event
                await Event.findOneAndDelete({ _id: _id })
                // delete all associated guests
                await Guest.deleteMany({ event_id: _id });
                // delete all associated passcodes
                await Password.deleteMany({ event_id: _id });

                return updatedUser;
            }
        },

        // create survey passcode
        addPassword: async (parent, args, context) => {
            if (context.user) {
                const password = await Event.create({ ...args, event_id: args.event_id });

                await Event.findByIdAndUpdate(
                    { _id: args.event_id },
                    { $push: { passwords: password } },
                    { new: true }
                )
                return password;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // update survey passcode
        updatePassword: async (parent, args, context) => {
            if (context.user) {
                const updatedPassword = await Password.findByIdAndUpdate(
                    { _id: args._id },
                    { ...args },
                    { new: true }
                );
                return updatedPassword;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // delete survey passcode
        removePassword: async (parent, args, context) => {
            if (context.user) {
                const updatedEvent = await Event.findByIdAndUpdate(
                    { _id: args.event_id },
                    { $pull: { passwords: _id } },
                    { new: true }
                );

                await Password.findOneAndDelete({ _id: args._id });

                return updatedEvent;
            }
        },

        // create guest
        addGuest: async (parent, args, context) => {
            if (context.user) {
                const guest = await Guest.create({ ...args, event_id: args.event_id });

                await Event.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { guests: guest } },
                    { new: true }
                )
                return guest;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // update guest (event planner can change availability)
        updateGuest: async (parent, args, context) => {
            if (context.user) {
                const updatedGuest = await Guest.findByIdAndUpdate(
                    { _id: args._id },
                    { ...args },
                    { new: true }
                );
                return updatedGuest;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        // delete guest
        removeGuest: async (parent, args, context) => {
            if (context.user) {
                const updatedEvent = await Event.findByIdAndUpdate(
                    { _id: args.event_id },
                    { $pull: { guests: _id } },
                    { new: true }
                );

                await Guest.findOneAndDelete({ _id: args._id });

                return updatedEvent;
            }
        },
    },
};

module.exports = resolvers;