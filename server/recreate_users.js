const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const recreateUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const testEmails = ['admin@natyanjali.com', 'student@natyanjali.com', 'teacher@natyanjali.com'];
        await User.deleteMany({ email: { $in: testEmails } });
        console.log('Deleted old users');

        const usersData = [
            { name: 'Admin User', email: 'admin@natyanjali.com', password: 'admin123', role: 'admin' },
            { name: 'Student User', email: 'student@natyanjali.com', password: 'student123', role: 'student' },
            { name: 'Teacher User', email: 'teacher@natyanjali.com', password: 'teacher123', role: 'teacher' }
        ];

        for (const data of usersData) {
            const user = new User(data);
            await user.save();
            console.log(`Created ${data.role}: ${data.email}`);
        }

        const checkAdmin = await User.findOne({ email: 'admin@natyanjali.com' });
        console.log('Admin password start:', checkAdmin.password.substring(0, 10));

        process.exit(0);
    } catch (err) {
        console.error('Failed:', err);
        process.exit(1);
    }
};

recreateUsers();
