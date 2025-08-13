require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8080;

try {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
} catch (err) {
    console.error('Unable to start Server', err);
}