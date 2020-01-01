const productService = require('../services/product.service');

class ProductController {
    static get name() {
        return "product";
    }

    get(req) {
        const id = req.params._id;
        return productService.get(id)
            .then((resp) => {
                return { data: resp };
            })
            .catch((err) => {
                return { message: err.message, status: 400 };
            });
    }

    list(req) {
        return productService.list()
            .then((resp) => {
                return { data: resp };
            })
            .catch((err) => {
                return { message: err.message, status: 400 };
            });
    }

    create(req) {
        const body = req.body;
        body.createdAt = new Date();
        return productService.create(body)
            .then((resp) => {
                return { data: resp, message: "Product created successfully" };
            })
            .catch((err) => {
                return { message: err.message, status: 400 };
            });
    }

    update(req) {
        const body = req.body;
        const id = req.params._id;

        delete body.id;
        return productService.update(body, id)
            .then((resp) => {
                body.id = id;
                return { data: body, message: "Product updated successfully" };
            })
            .catch((err) => {
                return { message: err.message, status: 400 };
            });
    }

    delete(req) {
        const id = req.params._id;
        return productService.delete(id)
            .then((resp) => {
                return { data: resp, message: "Product deleted successfully" };
            })
            .catch((err) => {
                return { message: err.message, status: 400 };
            });
    }


}

module.exports = new ProductController();