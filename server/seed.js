const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@natyanjali.com',
            password: 'password123',
            role: 'admin'
        });
        console.log('Admin created');

        // Create Teacher
        const teacher = await User.create({
            name: 'Priya Mani',
            email: 'priya@natyanjali.com',
            password: 'password123',
            role: 'teacher'
        });
        console.log('Teacher created');

        // Create Student
        const student = await User.create({
            name: 'Vishnu Reji',
            email: 'vishnu@natyanjali.com',
            password: 'password123',
            role: 'student'
        });
        console.log('Student created');

        // Create Courses
        const courses = [
            { name: 'Classical Dance', description: 'Bharatanatyam and Mohiniyattam', duration: '3 Years', teacher: teacher._id },
            { name: 'Vocal Music', description: 'Carnatic and Hindustani Vocal', duration: '2 Years', teacher: teacher._id }
        ];
        await Course.insertMany(courses);
        console.log('Courses seeded');

        console.log('Seeding complete!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
