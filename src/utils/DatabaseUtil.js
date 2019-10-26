const RampRequest = require("..//models/RampRequest");

class DatabaseUtil {
    dbData;

    constructor() {
        this.dbData.push(new RampRequest({
            businessName: "My Business",
            address: "123 Example Street"
            isBusinessOwner: false,
            businessContact: "",
            requestorEmail: "person@gmail.com"
        }));
        this.dbData.push(new RampRequest({
            businessName: "Cabannas",
            address: "Cabana Way"
            isBusinessOwner: true,
            businessContact: "example@business.com",
            requestorEmail: "example@business.com"
        }));
        this.dbData.push(new RampRequest({
            businessName: "Oni",
            address: "343 Mombassa St"
            isBusinessOwner: true,
            businessContact: "613-552-1234",
            requestorEmail: "example@business.com"
        }));
    }

    upload(data) {
        this.dbData.push(data);
    }
    getAll() {
        return this.dbData;
    }
}

export class DatabaseUtil;