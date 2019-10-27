/* TODO: Move file upload code to abstracted class */
class FileStorageService {
    constructor() { }

    uploadFile(file) {
        console.log("File Uploaded");
        return "http://www.example.com/image.jpg";
    }
}

module.exports = FileStorageService;