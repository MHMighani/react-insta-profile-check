const fs = require("fs")
const request = require("request")

function imageNameExtracter(profile_pic_url){
    const imageName = profile_pic_url.split("/")[8].split(".")[0]

    return imageName
}

//function for saving images to public folder
function profileImgSaver(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}

module.exports = {profileImgSaver, imageNameExtracter }