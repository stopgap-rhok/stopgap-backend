class RampRequest {
    constructor({requestId, businessName, address, isBusinessOwner, businessContact, fileId}) {
        this.requestId = requestId;
        this.businessName = businessName;
        this.address = address;
        this.isBusinessOwner = isBusinessOwner;
        this.businessContact = businessContact;
        this.fileId = fileId;
    }
}

module.exports.RampRequest = {RampRequest};
// export class RampRequest;
