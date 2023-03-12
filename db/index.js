const mongoose = require('mongoose');
require('dotenv').config();

const dataConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', true);
mongoose.connect(process.env._LOCAL_MONGODB_LINK, dataConfig)
    .then(() => {
        console.log("Api connect to dataBase");
    })
    .catch(error => {
        console.log(error);
    });