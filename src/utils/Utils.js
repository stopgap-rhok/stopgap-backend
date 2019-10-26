class Utils {
    /** Gets the param from either the query string or body of request */
    static getQueryOrBodyParam(req, param) {
        const { query, body } = req;
        if (query && query[param]) {
            return query[param];
        }
        if (body && body[param]) {
            return body[param];
        }
    }

    static getQueryParam(req, param) {
        const { query } = req;
        if (query && query[param]) {
            return query[param];
        }
    }

    static getBodyParam(req, param) {
        const { body } = req;
        if (body && body[param]) {
            return body[param];
        }
    }
}

// module.exports.Utils = Utils;
export class Utils;