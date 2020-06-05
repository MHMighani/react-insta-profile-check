const mysql = require("mysql")
const configInformation = require("./config")
const dbName = "profile_info_db"

let connection = mysql.createConnection(configInformation)

connection.connect(function(err){
    if(err) throw err;
    
    connection.query(`use ${dbName}`,(err,result)=>{
        if(err) throw err;
        console.log("connected!!");
    })    
})

module.exports = connection