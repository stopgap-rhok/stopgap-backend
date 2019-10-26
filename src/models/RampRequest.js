class RampRequest {
    constructor({businessName, address, isBusinessOwner, businessContact, requestorEmail}) {
        this.businessName = businessName;
        this.address = address;
        this.isBusinessOwner = isBusinessOwner;
        this.businessContact = businessContact;
        this.requestorEmail = requestorEmail;
    }
}

module.exports.RampRequest = {RampRequest};
// export class RampRequest;
