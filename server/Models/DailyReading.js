const { Schema, model } = require('mongoose');
const dailyReadingSchema = new Schema(
    {
        systolic: {
            type: Number,
            required: 'Please enter a valid systolic pressure'
        },
        diastolic: {
            type: Number,
            required: 'Please enter a valid diastolic pressure'
        },
        pulse: {
            type: Number,
            required: 'Please enter a valid pulse'
        },
        dateTime: {
            type: Date,
            required: true,
            default: Date.now,
        }
    },
);


const DailyReading = model('DailyReading', dailyReadingSchema);
module.exports = DailyReading;

