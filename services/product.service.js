class ProductService {

    get(id) {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM DB_Products WHERE id=${id}`, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            database.query(`select a.id, a.name, a.description, a.category, a.price, b.category as categoryName  from DB_Products as a join DB_Categories as b on a.category = b.id `, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }

    create(payload) {
        return new Promise((resolve, reject) => {
            database.query(`INSERT INTO DB_Products SET ?`, payload, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }

    update(payload, id) {
        return new Promise((resolve, reject) => {

            let query = [];
            const keys = Object.keys(payload);
            keys.forEach((item) => {
                query.push(` ${item}='${payload[item]}' `);
            });

            database.query(`UPDATE DB_Products SET ${query.join(',')} WHERE id=${id}`, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            database.query(`DELETE FROM DB_Products WHERE id=${id}`, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new ProductService();