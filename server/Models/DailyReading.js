const { Schema, model } = require('mongoose');
const dailyReadingSchema = new Schema(
    {
        bloodPressure: {
            type: Schema.Types.ObjectId,
            ref: 'BloodPressure'
        },
        pulse: {
            type: Number,
            required: 'Please enter a valid number'
        },
        dateTime: {
            type: Date,
            default: Date.now,
        }
    },
);


const DailyReading = model('DailyReading', dailyReadingSchema);
module.exports = DailyReading;

