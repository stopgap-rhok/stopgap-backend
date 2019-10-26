const RampRequest = require("../models/RampRequest");
const {Firestore} = require('@google-cloud/firestore');
const uuidv4 = require('uuid/v4');

class DatabaseService {
    constructor() {
        this.firestore = new Firestore();
    }

    async create(data) {
        const id = uuidv4();
        data.requestId = id;

        const document = this.firestore.doc('reports/'+data.requestId);
        await document.set(data);
        return id;
    }
    async getAll() {
        const document = this.firestore.doc('reports/');
        let doc = await document.get();
        return doc;
    }

    async getAllPaginated(skip, take) {
        const document = this.firestore.doc('reports/');
        return [];
    }

    async getByRequestId(id) { 
        const document = this.firestore.doc('reports/'+id);
        let doc = await document.get();
        return doc;
    }
}

module.exports = DatabaseService;