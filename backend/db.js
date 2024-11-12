const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoURI =
  "mongodb+srv://shaikhwasif720:wasif@cluster0.umazm.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
 
    await mongoose.connect(mongoURI,{useNewUrlParser:false},async(err,result)=>{
        if(err) console.log("---",err);
        else{
            console.log("Connected Successfully");
            const fetched_data = await mongoose.connection.db.collection('fooditems')
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection('foodcategory')
                foodCategory.find({}).toArray(function(err,catData){
                     if(err) console.log(err);
                else{
                    global.food_items = data
                    global.foodCategory = catData
                   
                };
                })
            })
        }
    })
};

module.exports = mongoDB;
