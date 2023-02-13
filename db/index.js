const mongoose = require('mongoose');
const local_url = "mongodb://127.0.0.1:27017/Chat-App" // local dataBase
const remote_url = "" //remote database

const dataConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', true);
mongoose.connect(local_url, dataConfig)
    .then(() => {
        console.log("Api connect to dataBase");
    })
    .catch(error => {
        console.log(error);
    });