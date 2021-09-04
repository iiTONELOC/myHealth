const db = require('../config/connection');
const { User, BloodPressure, DailyReading } = require('../models');


db.once('open', async () => {
    try {
        await User.deleteMany({});
        await BloodPressure.deleteMany({});
        await DailyReading.deleteMany({})
    } catch (error) {
        throw new Error('Unable to delete Database')
    }
    console.log('all done!');
    process.exit(0);
});


