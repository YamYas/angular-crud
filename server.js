const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist2/angular-crud'));
console.log(__dirname)

// our apis

app.all('*', (req, res)=>{
    res.status(200).sendFile(__dirname + '/dist2/angular-crud/index.html');
})

app.listen(process.env.PORT || 8080);