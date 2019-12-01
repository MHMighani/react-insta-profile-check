const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const routes = require("./routes/handlers")


//modules for downloading images
var fs = require("fs")
// const request = require('request')
const app = express();
const PORT = process.env.PORT || 4000

const product_url = "produc-url"
const origin = process.env.NODE_ENV !== "production" ? "http://localhost:3000" : product_url

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({
    type: ['application/json','text/plain']
}))
app.use(methodOverride("_method"))

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({ origin }))

app.use('/static', express.static('instagram_users_profile_pics'))


//for serving static files 
app.use(express.static('public'))



app.use("/",routes)

app.listen(PORT, ()=>{
    console.log(`server is starting at PORT ${PORT}`);    
});




// //function for saving images to public folder
// var profileImgSaver = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//       console.log('content-type:', res.headers['content-type']);
//       console.log('content-length:', res.headers['content-length']);
  
//       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
//   };


// app.get("/",async (req,res)=>{
//     const userName = req.query.username
    
//     // const response = await axios.get(`https://www.instagram.com/${userName}/?__a=1`)
//     const response = await axios.get(`https://www.instagram.com/salar_slmt/?__a=1`)
//     const profile_url = response.data["graphql"]["user"]["profile_pic_url_hd"]

//     profileImgSaver(profile_url,'public/myProfilePic2.png',function(){
//         console.log("image saved,go and check it out");
//     })

//     res.json({
//         data:profile_url
//     })
// })

// app.listen(4000,()=>{
//     console.log("we are listening on port 4000");    
// })
