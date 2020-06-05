const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const routes = require("./routes/handlers")


//modules for downloading images
const fs = require("fs")
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

app.use('/static', express.static('./src/instagram_users_profile_pics'))


//for serving static files 
app.use(express.static('public'))



app.use("/",routes)

app.listen(PORT, ()=>{
    console.log(`server is starting at PORT ${PORT}`);    
});