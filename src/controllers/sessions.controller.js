const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Login: genera y retorna JWT
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

// Current: retorna solo datos permitidos (DTO simple)
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
