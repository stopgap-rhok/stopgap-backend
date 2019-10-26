const RampRequest = require("../models/RampRequest");

const {Firestore} = require('@google-cloud/firestore');

class DatabaseService {
    constructor() {
        this.firestore = new Firestore();

        this.dbData = [
            new RampRequest({
                requestId: 0,
                businessName: "My Business",
                businessAddress: "123 Example Street",
                businessDetails: "",
                metRequirements: false,
                userEmail: "user@example.com",
                userIsOwner: false,
                attachments: ["http://www.example.com/image1.jpg"],
            }),
            new RampRequest({
                requestId: 1,
                businessName: "Cabannas",
                businessAddress: "Cabana Way",
                businessDetails: "",
                metRequirements: false,
                userEmail: "example@business.com",
                userIsOwner: true,
                attachments: ["http://www.example.com/image2.jpg"],
            }),
            new RampRequest({
                requestId: 2,
                businessName: "Oni",
                businessAddress: "343 Mombassa St",
                businessDetails: "",
                metRequirements: false,
                userEmail: "613-552-1234",
                userIsOwner: true,
                attachments: ["http://www.example.com/image3.jpg"],
            })
        ];
    }

    create(data) {
        const document = this.firestore.doc('posts/intro-to-firestore');
        this.dbData.push(data);
    }
    getAll() {
        const document = this.firestore.doc('posts/intro-to-firestore');
        return this.dbData;
    }
    getAllPaginated(skip, take) {
        const document = this.firestore.doc('posts/intro-to-firestore');
        return this.dbData.skip(skip).take(take);
    }

    getByRequestId(id) {
        const document = this.firestore.doc('posts/intro-to-firestore');
        return this.dbData[id];
    }
}

module.exports = DatabaseService;