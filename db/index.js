const mongoose = require('mongoose');
const passwordCluster = '7Nb5zfci5zvY6Q8c';

const local_url = "mongodb://127.0.0.1:27017/Chat-App" // local dataBase
const remote_url = "mongodb+srv://ERuvinga:7Nb5zfci5zvY6Q8c@chatapp.oud1pus.mongodb.net/?retryWrites=true&w=majority" //remote database

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