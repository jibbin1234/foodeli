const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://jibbin:Aforapple@clusterfoodeli.lsj8nxn.mongodb.net/gofeedmern?retryWrites=true&w=majority"

const mongoDB = () => {
mongoose.connect(mongoURI,{useNewUrlParser:true})
    .then( async () => {             
        console.log('connected to mongoAtlas successfully');
        const db = mongoose.connection;
        global.foodItems = await db.collection('foodItems').find({}).toArray()
        global.foodCategory = await db.collection('foodCategory').find({}).toArray()
        //console.log(global.foodCategory);
    })
    .catch((error)=>{
        console.log(error);  
    }) 
}

module.exports = mongoDB;