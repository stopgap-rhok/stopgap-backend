class RampRequest {
    /*{
        businessName: required(string),
        businessAddress: required(string),
        businessDetails: optional(string),
        metRequirements: required([]string),
        userEmail: optional(string),
        userIsOwner: required(boolean),
        attachments: required([]file)
    }*/
    constructor({
        requestId,
        businessName,
        businessAddress,
        businessDetails,
        metRequirements,
        userEmail,
        userIsOwner,
        attachments,
    }) {
        this.requestId = requestId;
        this.businessName = businessName;
        this.businessAddress = businessAddress;
        this.businessDetails = businessDetails;
        this.metRequirements = metRequirements
        this.userEmail = userEmail;
        this.userIsOwner = userIsOwner;
        this.attachments = attachments;
    }
}

module.exports = RampRequest;