const RampRequest = require("../models/RampRequest");

class DatabaseService {
    constructor() {
        this.dbData = [
            new RampRequest({
                requestId: 0,
                businessName: "My Business",
                address: "123 Example Street",
                isBusinessOwner: false,
                businessContact: "",
                requestorEmail: "person@gmail.com",
                fileId: 0,
            }),
            new RampRequest({
                requestId: 1,
                businessName: "Cabannas",
                address: "Cabana Way",
                isBusinessOwner: true,
                businessContact: "example@business.com",
                requestorEmail: "example@business.com",
                fileId: 0,
            }),
            new RampRequest({
                requestId: 2,
                businessName: "Oni",
                address: "343 Mombassa St",
                isBusinessOwner: true,
                businessContact: "613-552-1234",
                requestorEmail: "example@business.com",
                fileId: 0,
            })
        ];
    }

    upload(data) {
        this.dbData.push(data);
    }
    getAll() {
        return this.dbData;
    }
    getByRequestId(id) {
        return this.dbData[id];
    }
}

module.exports.DatabaseService = {DatabaseService};
// export class DatabaseService;