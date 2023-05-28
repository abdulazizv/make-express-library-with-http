const http = require('http');

function express() {
    const app = {
        routes: [],
        use: function (middleware) {
            this.routes.push({ method: 'USE', middleware });
        },
        get: function (path, handler) {
            this.routes.push({ method: 'GET', path, handler });
        },
        post: function (path, handler) {
            this.routes.push({ method: 'POST', path, handler });
        },
        put: function (path, handler) {
            this.routes.push({ method: 'PUT', path, handler });
        },
        delete: function (path, handler) {
            this.routes.push({ method: 'DELETE', path, handler });
        },
        listen: function (port, callback) {
            const server = http.createServer((req, res) => {
                const matchingRoutes = this.routes.filter(
                    (route) =>
                        (route.method === 'USE' || route.method === req.method) &&
                        (route.path === req.url || route.path === '*')
                );

                let i = 0;
                function next() {
                    const route = matchingRoutes[i++];
                    if (route) {
                        if (route.method === 'USE') {
                            route.middleware(req, res, next);
                        } else {
                            let statusCode = 200;
                            let responseBody = '';

                            res.status = (status) => {
                                statusCode = status;
                                return res;
                            };

                            res.send = (body) => {
                                responseBody = body;
                                res.statusCode = statusCode;
                                res.setHeader('Content-Type', 'text/plain');
                                res.end(responseBody);
                            };

                            route.handler(req, res);
                        }
                    }
                }

                next();
            });

            server.listen(port, callback);
        },
    };

    return app;
}

module.exports = express;
