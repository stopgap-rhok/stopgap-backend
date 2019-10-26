class RampRequest {
    businessName
    address
    isBusinessOwner
    businessContact
    requestorEmail

    constructor({businessName, address, isBusinessOwner, businessContact, requestorEmail}) {
        this.businessName = businessName;
        this.address = address;
        this.isBusinessOwner = isBusinessOwner;
        this.businessContact = businessContact;
        this.requestorEmail = requestorEmail;
    }
}

export class RampRequest;
