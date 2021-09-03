const { Schema, model } = require('mongoose');

const bloodPressureSchema = new Schema(
    {
        systolic: {
            type: Number,
            required: true,
        },
        diastolic: {
            type: Number,
            required: true,
        }
    },
);


const BloodPressure = model('BloodPressure', bloodPressureSchema);
module.exports = BloodPressure;

