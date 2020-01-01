class UserService {

    get(where = "") {
        return new Promise((resolve, reject) => {
            database.query(`select * from DB_Users where ${where}`, (err, result) => {
                if (err) {
                    throw new Error(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    count(where = "") {
        return new Promise((resolve, reject) => {
            database.query(`select count(*) as count from DB_Users where ${where}`, (err, result) => {
                if (err) {
                    throw new Error(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    create(payload) {
        return new Promise((resolve, reject) => {
            database.query(`INSERT INTO DB_Users SET ?`, payload, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new UserService();