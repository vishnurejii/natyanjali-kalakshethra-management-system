const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const Timetable = require('./models/Timetable');

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Course.deleteMany({});
    await Timetable.deleteMany({});

    // Find teacher
    const teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) {
        console.log('No teacher found! Run registration test first.');
        process.exit(1);
    }

    // Create Courses
    const courses = await Course.insertMany([
      { name: 'Classical Dance', description: 'Bharatanatyam basics', duration: '6 Months', fee: 3000 },
      { name: 'Vocal Music', description: 'Carnatic Vocal', duration: '1 Year', fee: 2500 },
      { name: 'Instrumental Music', description: 'Violin/Veena', duration: '1 Year', fee: 3500 }
    ]);

    // Create Timetable entries
    await Timetable.insertMany([
      { 
        course: courses[0]._id, 
        assignedTeacher: teacher._id, 
        day: 'Monday', 
        startTime: '16:00', 
        endTime: '17:30', 
        location: 'Studio A' 
      },
      { 
        course: courses[1]._id, 
        assignedTeacher: teacher._id, 
        day: 'Wednesday', 
        startTime: '17:00', 
        endTime: '18:30', 
        location: 'Music Hall' 
      }
    ]);

    console.log('Successfully seeded Courses and Timetable!');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seedData();
