const mongoose = require('mongoose');
const { MongoInfos } = require('./DataOfMongo');

const local_url = "mongodb://127.0.0.1:27017/Chat-App" // local dataBase
const remote_url = `mongodb+srv://${MongoInfos.user}:${MongoInfos.password}@chatapp.oud1pus.mongodb.net/?retryWrites=true&w=majority` //remote database

const dataConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', true);
mongoose.connect(local_url, dataConfig)
    .then(() => {
        console.log("Api connect to dataBase");
        console.log(`remote_url: ${remote_url}`);
    })
    .catch(error => {
        console.log(error);
    });