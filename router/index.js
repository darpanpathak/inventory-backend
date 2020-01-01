const auth = require('../helpers/authentication');
const path = require('path');

module.exports = (app) => {

    const noAuthRequired = process.env.NO_AUTH_CONTROLLER.split(',');
    app.use((req, res, next) => {
        const urlArr = (req.url).split('/');
        if (noAuthRequired.indexOf(urlArr[3]) == -1) {
            auth.isAuthenticated(req, res, next);
        } else
            next();
    });

    const router = (req, res, next) => {

        req.params.controller += ".controller";
        if (!controllers[req.params.controller]) next();
        else if (!controllers[req.params.controller][req.params.method]) next();
        else if (req.params.method.startsWith('_')) next();
        else {
            new Promise((resolve, reject) => {
                try {
                    resolve(controllers[req.params.controller][req.params.method](req))
                } catch (ex) {
                    reject(ex);
                }
            }).then(result => {
                res.status(result.status ? result.status : 200).json({
                    message: result.message,
                    profilePercentage: result.profilePercentage,
                    data: result.data,
                    additionalDetails: result.additionalDetails,
                    pagination: result.pagination,
                    totalCount: result.totalCount,
                    count: result.count
                });
            }).catch(error => {
                res.status(error.status ? error.status : 400).json({
                    message: error.message
                });
            });
        }
    }

    app.all('/api/v1/:controller/:method', router);

    app.all('/api/v1/:controller/:_groupId/:method', router);

    app.all('/api/v1/:controller/:method/:_id', router);

    app.all('/*', function(req, res) {
        console.log(app.get('appPath'));
        res.sendFile(path.join(__dirname, '../front-end/', 'index.html'));
    });

    app.use((req, res, next) => {
        res.status(404).send('Not found!');
    });
}