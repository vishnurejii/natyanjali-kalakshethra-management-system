const User = require('../models/User');
const nodemailer = require('nodemailer');

const sendCredentialEmail = async (email, name, password, role) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Welcome to Natyanjali Kalakshetra — Your Login Credentials`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
                <div style="background:linear-gradient(135deg,#312e81,#4f46e5);padding:30px;text-align:center;">
                  <h1 style="color:white;margin:0;font-size:24px;">🎭 Natyanjali Kalakshetra</h1>
                  <p style="color:#c7d2fe;margin:5px 0 0 0;">Arts Education Management System</p>
                </div>
                <div style="padding:30px;">
                  <p style="font-size:16px;">Dear <strong>${name}</strong>,</p>
                  <p>Welcome! Your <strong>${role}</strong> account has been created on the Natyanjali Kalakshetra portal.</p>
                  <div style="background:#f3f4f6;border-radius:8px;padding:20px;margin:20px 0;">
                    <p style="margin:0 0 10px 0;font-weight:bold;">Your Login Credentials:</p>
                    <p style="margin:5px 0;"><strong>Portal:</strong> <a href="http://localhost:5173/login">http://localhost:5173/login</a></p>
                    <p style="margin:5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin:5px 0;"><strong>Password:</strong> <code style="background:#e5e7eb;padding:4px 8px;border-radius:4px;font-size:16px;letter-spacing:2px;">${password}</code></p>
                  </div>
                  <p style="color:#ef4444;font-size:13px;">⚠️ Please change your password after your first login.</p>
                  <p>Best regards,<br><strong>Natyanjali Kalakshetra Administration</strong></p>
                </div>
              </div>
            `
        });
        console.log(`✅ Credentials email sent to ${email}`);
    } catch (err) {
        console.error(`❌ Email failed for ${email}:`, err.message);
        console.error('Email config:', {
            user: process.env.EMAIL_USER,
            passConfigured: !!process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_app_password_here'
        });
    }
};

// @desc  Admin creates a new user (student/teacher) & sends credentials via email
// @route POST /api/users/create
// @access Admin only
exports.createUser = async (req, res) => {
    const { name, email, role, phone, address } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        const rawPassword = Math.random().toString(36).slice(-8) + 'A1!';
        const user = await User.create({ name, email, password: rawPassword, role, phone, address });

        sendCredentialEmail(email, name, rawPassword, role);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Get all users (optionally filter by role)
// @route GET /api/users
// @access Admin
exports.getUsers = async (req, res) => {
    try {
        const filter = {};
        if (req.query.role) filter.role = req.query.role;
        const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Get single user by ID
// @route GET /api/users/:id
// @access Admin
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Update user
// @route PUT /api/users/:id
// @access Admin
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, email, role, phone, address, password } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        if (password) user.password = password;

        await user.save();
        const updated = await User.findById(user._id).select('-password');
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc  Delete user
// @route DELETE /api/users/:id
// @access Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
