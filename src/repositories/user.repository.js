const usersDAO = require('../dao/classes/users.dao');

class UserRepository {
    list() { return usersDAO.findAll(); }
    get(id) { return usersDAO.findById(id); }
    getByEmail(email) { return usersDAO.findByEmail(email); }
    create(payload) { return usersDAO.create(payload); }
    update(id, payload) { return usersDAO.update(id, payload); }
    delete(id) { return usersDAO.delete(id); }
}

module.exports = new UserRepository();
