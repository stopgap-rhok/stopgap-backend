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
        this.requestCollectionName = "reports";
    }

    async getAll() {
        const reportsCollection = admin.firestore().collection(this.requestCollectionName);
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
        let reportsCollection = admin.firestore().collection(this.requestCollectionName)
            .orderBy('requestId')
            .offset(skip)
            .limit(take)

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

    async getByRequestId(id) {
        const getDocument = this.firestore.doc(this.requestCollectionName + '/' + id);
        let doc = await getDocument.get();
        return doc.data();
    }

    async create(data) {
        const id = uuidv4();
        data.requestId = id;

        const createDocument = this.firestore.doc(this.requestCollectionName + '/' + data.requestId);
        await createDocument.set(data);
        return id;
    }

    async update(data) {
        return true;
    }

    async deleteByRequestId(id) {
        const deleteDocument = db.collection(this.requestCollectionName).doc(id);
        let deleteDoc = deleteDocument.delete();
        return true;
    }
}

module.exports = DatabaseService;
