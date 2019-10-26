class FileStorageService {
    constructor() {
        this.fileData = [
            {
                fileId: 0,
                data: "Hello World!",
            },
            {
                fileId: 1,
                data: "This is a Test",
            },
            {
                fileId: 2,
                data: "I am an image :3",
            },
        ];
    }

    uploadFile(file) {
        console.log("File Uploaded");
        file.fileId = 3;
        this.fileData.push(file);
        return file.fileId;
    }
}

module.exports = FileStorageService;