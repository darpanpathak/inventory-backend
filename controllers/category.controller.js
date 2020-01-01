const categoryService = require('../services/category.service');

class CategoryController {
    static get name() {
        return "category";
    }

    list(req) {
        return categoryService.list()
            .then((resolve) => {
                return { data: resolve, message: "category list" };
            })
            .catch((error) => {
                return { status: 400, message: error.message };
            })
    }

}

module.exports = new CategoryController();