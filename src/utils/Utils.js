class Utils {
    static hasQueryOrBodyParam(req, param) {
        const { query, body } = req;
        if (query && query[param]) {
            return true;
        }
        if (body && body[param]) {
            return true;
        }
        return false;
    }

    static hasQueryParam(req, param) {
        const { query } = req;
        if (query && query[param]) {
            return true;
        }
        return false;
    }

    static hasBodyParam(req, param) {
        const { body } = req;
        if (body && body[param]) {
            return true;
        }
        return false;
    }

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

module.exports = Utils;