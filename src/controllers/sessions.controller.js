const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendEmail } = require('../utils/mailer');
const resetPasswordTemplate = require('../utils/resetPasswordTemplate');

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Current
exports.currentSession = (req, res) => {
    const { first_name, last_name, email, role } = req.user;

    const userDTO = {
        name: `${first_name} ${last_name}`,
        email,
        role
    };

    res.json({
        message: 'Current session retrieved',
        user: userDTO
    });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: 'Email required' });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;
        const html = resetPasswordTemplate(resetLink);

        await sendEmail(email, 'Password Reset', html);

        res.status(200).json({ message: 'An email has been sent to reset your password' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server internal error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) return res.status(400).json({ message: 'New password is required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: 'The new password must be different from the previous one' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid or expired token' });
    }
};
