const require = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/angular-crud'));

// our apis

app.all('*', (req, res)=>{
    res.status(200).sendFile(__dirname + '/dist/angular-crud/index.html');
})

app.listen(process.env.PORT || 8080)