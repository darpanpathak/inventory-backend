class CategoryService {

    list() {
        return new Promise((resolve, reject) => {
            database.query(`SELECT * FROM DB_Categories`, (err, result) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = new CategoryService();