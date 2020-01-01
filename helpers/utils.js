module.exports = {
    GET: (req, res, next) => {
        if (req.method.toLowerCase() === "get")
            next;
        else
            throw new Error("Method not supported");
    }
}