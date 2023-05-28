const http = require('http');
const url = require('url');
const querystring = require('querystring');

function express() {
    const app = {
        routes: [],
        use: function (middleware) {
            this.routes.push({method: 'USE', middleware});
        },
        get: function (path, handler) {
            this.routes.push({method: 'GET', path, handler});
        },
        post: function (path, handler) {
            this.routes.push({method: 'POST', path, handler});
        },
        put: function (path, handler) {
            this.routes.push({method: 'PUT', path, handler});
        },
        delete: function (path, handler) {
            this.routes.push({method: 'DELETE', path, handler});
        },
        listen: function (port, callback) {
            const server = http.createServer((req, res) => {
                const {pathname} = url.parse(req.url, true);
                const parsedUrl = url.parse(req.url, true);
                req.query = parsedUrl.query;
                req.headers = req.headers;

                let requestBody = '';

                req.on('data', (chunk) => {
                    requestBody += chunk;
                });

                req.on('end', () => {
                    try {
                        req.body = JSON.parse(requestBody);
                    } catch (error) {
                        req.body = {};
                    }

                    const matchingRoutes = this.routes.filter(
                        (route) =>
                            (route.method === 'USE' || route.method === req.method) &&
                            matchPath(route.path, pathname)
                    );

                    let i = 0;

                    function next() {
                        const route = matchingRoutes[i++];
                        if (route) {
                            if (route.method === 'USE') {
                                route.middleware(req, res, next);
                            } else {
                                const {params} = matchPath(route.path, pathname)
                                req.params = params
                                let statusCode = 200;
                                let responseBody = '';

                                res.status = (status) => {
                                    statusCode = status;
                                    return res;
                                };

                                res.send = (body) => {
                                    if (typeof body === 'object') {
                                        res.setHeader('Content-Type', 'application/json');
                                        responseBody = JSON.stringify(body);
                                    } else {
                                        res.setHeader('Content-Type', 'text/plain');
                                        responseBody = body;
                                    }

                                    res.statusCode = statusCode;
                                    res.end(responseBody);
                                };

                                res.json = (body) => {
                                    if (typeof body === 'object') {
                                        res.setHeader('Content-Type', 'application/json');
                                        responseBody = JSON.stringify(body);
                                    } else {
                                        res.setHeader('Content-Type', 'text/plain');
                                        responseBody = body;
                                    }

                                    res.statusCode = statusCode;
                                    res.end(responseBody);
                                }

                                route.handler(req, res);
                            }
                        }
                    }

                    next();
                });
            });

            server.listen(port, callback);
        },
    };
    return app
}
function matchPath(routePath, pathname) {
    const routePathSegments = routePath.split('/');
    const pathnameSegments = pathname.split('/');

    if (routePathSegments.length !== pathnameSegments.length) {
        return false;
    }

    const params = {};

    for (let i = 0; i < routePathSegments.length; i++) {
        const routeSegment = routePathSegments[i];
        const pathSegment = pathnameSegments[i];

        if (routeSegment.startsWith(':')) {
            const paramName = routeSegment.slice(1);
            params[paramName] = pathSegment;
        } else if (routeSegment !== pathSegment) {
            return false;
        }
    }

    return { match: true, params };
}
module.exports = express;

