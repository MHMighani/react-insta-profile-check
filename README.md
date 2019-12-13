# Installing

use `server/database-dump.sql` for creating tables

add `config.js` file to your `server/config` file and add your database information in this format:
```
const configInformation = {
    host:"localhost",
    user:"",  //your user
    password:"",  //your password
    multipleStatements:true,
    charset: 'utf8mb4'
}

module.exports = configInformation
```

run `npm install` in both server and client folders to install dependencies 

run `npm start` in both server and client folders


