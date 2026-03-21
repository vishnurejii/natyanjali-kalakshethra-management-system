const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const Timetable = require('./models/Timetable');

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await User.countDocuments();
    const courses = await Course.countDocuments();
    const timetables = await Timetable.find().populate('course').populate('assignedTeacher');

    console.log('Total Users:', users);
    console.log('Total Courses:', courses);
    console.log('Timetable Entries:', timetables.length);
    
    timetables.forEach(t => {
      console.log(`- ${t.course?.name || 'Unknown Course'} | ${t.day} | ${t.startTime} | ${t.assignedTeacher?.name || 'Unknown Teacher'}`);
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkData();
