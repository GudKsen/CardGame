import fs from "fs";
import mysql from "mysql2";
import path from "path";
const __dirname = path.resolve();
var pathToJson = path.resolve(__dirname, './database/config.json');
const config = JSON.parse(fs.readFileSync(pathToJson, "utf8"));
import bcrypt from "bcrypt";

const pool = mysql.createPool(config);

function find_user_in_db(user, req, res) {
  pool.query(
    "SELECT * FROM users_info WHERE login=?",
    user.login,
    function (err, rows) {
      if (err) {
        return res.render("login", {
          error_message: "ERROR",
        });
      }

      if (rows[0] === undefined) {
        return res.render("login", {
          error_message: "User does not exist.",
        });
      } else if (!bcrypt.compareSync(user.password, rows[0].password)) {
        return res.render("login", {
          error_message: "Incorrect password.",
        });
      } else {
        let login = rows[0].login;
        let userStatus = rows[0].userStatus;
        req.session.user = { login, userStatus };
        return res.render("greeting", {
          userStatus: rows[0].userStatus,
          login: rows[0].login,
        });
      }
    }
  );
}

function updatePasswordBD(user, res) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  try {
    pool.query(
      `UPDATE users_info SET password = '${user.password}' WHERE login = '${user.login}'`
    );
  } catch (err) {
    return res.render("error");
  }
}

function save_to_db(user, res) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

  pool.query("INSERT INTO users_info SET ?", user, function (err) {
    if (err !== null) {
      if (err.errno === 1062) {
        const errWords = err.sqlMessage.split(" ");
        const entry = errWords[2];
        const fieldDB = errWords[5];
        const str = fieldDB.slice(7);
        return res.render("registration", {
          error_message: `${entry} already exists for ${str}`,
        });
      }
    } else if (err === null) {
      return res.render("greeting", {
        login: user.login,
      });
    } else {
      console.log(err.errno);
      console.log(err.sqlMessage);
      return res.render("registration", {
        error_message: "smth going wrong",
      });
    }
  });
}

export { save_to_db, updatePasswordBD, find_user_in_db };

