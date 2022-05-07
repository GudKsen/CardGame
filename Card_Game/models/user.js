import Model from './model.js'

 class User extends Model {
    constructor(login, password, full_name, email) {
        super(login, password, full_name, email);
    }

    find(req, res) {
        super.find(req, res);
    }

    updatePassword(res) {
        super.updatePassword(res);
    }

    save(res) {
        super.save(res);
    }
}

export default User;

