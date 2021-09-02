const { Schema, model } = require('mongoose');

const bloodPressureSchema = new Schema(
    {
        systolic: {
            type: Number,
            required: true,
        },
        diastolic: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
    },
);


const BloodPressure = model('BloodPressure', bloodPressureSchema);
module.exports = BloodPressure;

