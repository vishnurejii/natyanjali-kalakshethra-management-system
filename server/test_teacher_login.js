const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'teacher@natyanjali.com';
        const password = 'teacher123';
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        
        const isMatch = await user.comparePassword(password);
        console.log('Login match:', isMatch);
        
        if (isMatch) {
            console.log('SUCCESS: Teacher login would work.');
        } else {
            console.log('FAILURE: Teacher login would NOT work. Password mismatch.');
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

testLogin();
