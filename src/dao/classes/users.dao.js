const User = require('../../models/user.model');

class UsersDAO {
    findAll() { return User.find(); }
    findById(id) { return User.findById(id); }
    findByEmail(email) { return User.findOne({ email }); }
    create(data) { return User.create(data); }
    update(id, data) { return User.findByIdAndUpdate(id, data, { new: true }); }
    delete(id) { return User.findByIdAndDelete(id); }
}

module.exports = new UsersDAO();
