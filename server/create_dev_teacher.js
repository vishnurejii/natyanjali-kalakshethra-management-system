require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const { createUser } = require('./controllers/userController');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // Check if exists
    const existing = await User.findOne({ email: 'vishnucr012345@gmail.com' });
    if (existing) {
        console.log('User already exists! Deleting...');
        await User.deleteOne({ email: 'vishnucr012345@gmail.com' });
    }
    
    const rawPassword = Math.random().toString(36).slice(-8) + 'A1!';
    const user = await User.create({
      name: 'vishnu',
      email: 'vishnucr012345@gmail.com',
      password: rawPassword,
      role: 'teacher'
    });
    
    console.log(`\n=== ACCOUNT CREATED SUCCESSFULLY ===`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${rawPassword}`);
    console.log(`====================================\n`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error creating user:', err);
    process.exit(1);
  });
