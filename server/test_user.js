const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const testUserCreation = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const userData = {
            name: 'Test',
            email: 'test' + Date.now() + '@example.com',
            password: 'password123',
            role: 'student'
        };

        console.log('Creating user...');
        const user = await User.create(userData);
        console.log('User created:', user.email);

        process.exit(0);
    } catch (error) {
        console.error('ERROR IN TEST:', error);
        console.error('STACK:', error.stack);
        process.exit(1);
    }
};

testUserCreation();
