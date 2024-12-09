let sharp = require('sharp');

let imageHandler = async (req, type) => {
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-'); // removes empty space in file name and replaces with '-'
    // await is used as sharp is asynchronous
    await sharp(req.file.buffer)
        .resize({
            width: 800,
        })
        .jpeg({ quality: 80 })
        .withMetadata()
        .toFile('./uploads/images/' + type + filename); // sharp is used to compress the image and store in the location
}

module.exports = imageHandler;
