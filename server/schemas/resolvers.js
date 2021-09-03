const { User, BloodPressure, DailyReading } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate({ path: 'dailyReadings', populate: 'bloodPressure' })
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        bloodPressure: async (parent, { _id }, context) => {
            const params = _id ? { _id } : {};
            return BloodPressure.find(params)
                .select('-__v');
        },
        // get all users
        // get user by username
        // get user by _id
        users: async (parent, { _id, username }) => {
            const params = _id ? { _id } : username ? { username } : {};
            return User.find(params)
                .select('-__v -password')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addBloodPressure: async (parent, args, context) => {
            // make sure logged in
            console.log(context.user)
            const newPressure = await BloodPressure.create({ ...args });
            console.log(newPressure)
            return newPressure
        },
        addDailyReading: async (parent, args, context) => {
            // create the dailyReading
            // then update user
            if (context.user) {
                const newEntry = await DailyReading.create({ ...args });
                console.log(newEntry)
                if (newEntry !== null) {
                    const { _id } = newEntry;
                    const updatedUserInfo = await User.findByIdAndUpdate(context.user._id, {
                        $push: { dailyReadings: _id }
                    });
                    return updatedUserInfo
                }
            }
        }
    },

};

module.exports = resolvers;