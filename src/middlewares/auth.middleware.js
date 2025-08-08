const passport = require('passport');

// Middleware para verificar que el usuario está autenticado
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Middleware para verificar el rol del usuario
const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role permissions.' });
        }

        next();
    };
};

module.exports = {
    authenticateJWT,
    checkRole
};
