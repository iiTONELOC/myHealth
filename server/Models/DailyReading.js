const { Schema, model } = require('mongoose');
const dailyReadingSchema = new Schema(
    {
        bloodPressure: {
            type: Schema.Types.ObjectId,
            ref: 'BloodPressure'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        dateTime: {
            type: Date,
            default: Date.now,
        }
    },
);


const DailyReading = model('DailyReading', dailyReadingSchema);
module.exports = DailyReading;

