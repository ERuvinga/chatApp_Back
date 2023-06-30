// this controller update a status of user if(User connected or disconnect) and last hour are connected

const userModel = require('../Models/user');
exports.userConnected = (idUser)=>{
    userModel.updateOne({_id:idUser},{
        $set:{status:true}
    })

    .then(()=> console.log("status Updated true for"))
    .catch((error) => console.log(error));
}

exports.userDisconnected = (idUser)=>{
    userModel.updateOne({_id:idUser},{
        $set:{status:false}
    })

    .then(()=> console.log("status Updated false for"))
    .catch((error) => console.log(error)); 
}