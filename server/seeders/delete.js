const db = require('../config/connection');
const { User, BloodPressure, DailyReading } = require('../models');

if (process.env.NODE_ENV !== 'production') {
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
}

