const RampRequest = require("../models/RampRequest");
const {
    Firestore
} = require('@google-cloud/firestore');
var admin = require("firebase-admin");
const uuidv4 = require('uuid/v4');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

class DatabaseService {
    constructor() {
        this.firestore = new Firestore();

    }

    async create(data) {
        const id = uuidv4();
        data.requestId = id;

        const document = this.firestore.doc('reports/' + data.requestId);
        await document.set(data);
        return id;
    }
    async getAll() {
        const reportsCollection = admin.firestore().collection('reports');
        let allDoc = await reportsCollection.get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => {
                    results.push(doc.data());
                });
                return results;
            });
        return allDoc;
    }

    async getAllPaginated(skip, take) {
        const reportsCollection = admin.firestore().collection('reports')
            .startAt(skip);
            
        let allDoc = await reportsCollection.get()
            .then(snapshot => {
                const results = [];
                snapshot.take(take).forEach(doc => {
                    results.push(doc.data());
                });
                return results;
            });
        return allDoc;
    }

    async getByRequestId(id) {
        const document = this.firestore.doc('reports/' + id);
        let doc = await document.get();
        return doc.data();
    }
}

module.exports = DatabaseService;