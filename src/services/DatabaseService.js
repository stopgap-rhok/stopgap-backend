const RampRequest = require("../models/RampRequest");
const {Firestore} = require('@google-cloud/firestore');
var admin = require("firebase-admin");
const uuidv4 = require('uuid/v4');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

class DatabaseService {
    constructor() {
        this.firestore = new Firestore();
        this.adminDb = admin.firestore();
    }

    async create(data) {
        const id = uuidv4();
        data.requestId = id;

        const document = this.firestore.doc('reports/'+data.requestId);
        await document.set(data);
        return id;
    }
    async getAll() {
        const document = this.adminDb.doc('reports');
        let allDoc = await document.get()
        .then(snapshot=>{
            const results = [];
            snapshot.forEach(doc => {
                results.push(doc.data());
            });
            return results;
        });
        return allDoc;
    }

    async getAllPaginated(skip, take) {
        const document = this.firestore.doc('reports');
        return [];
    }

    async getByRequestId(id) { 
        const document = this.firestore.doc('reports/'+id);
        let doc = await document.get();
        return doc;
    }
}

module.exports = DatabaseService;