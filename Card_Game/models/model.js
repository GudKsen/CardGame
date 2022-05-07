// import sql from './db.js';
// const sql = require('./db.js')
import {find_user_in_db, updatePasswordBD, save_to_db} from '../database/db.js'

 class Model {
    constructor(login, password, full_name, email) {
        this.login = login;
        this.password = password;
        this.fullName = full_name;
        this.email = email;
    }

    find(req, res) {
        let object1 = {
            login: this.login,
            password: this.password,
        }
        find_user_in_db(object1, req, res);
    }

    updatePassword(res) {
        let object = {
            login: this.login,
            password: this.password
        }
        updatePasswordBD(object, res);
    }

     save(res) {
        let object = {
            login: this.login,
            password: this.password,
            fullName: this.fullName,
            email: this.email
        }
        save_to_db(object, res);
    }
}

export default Model

