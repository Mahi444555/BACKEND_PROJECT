const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mahesh25:mahesh25@cluster0.ppcbzm4.mongodb.net/gofoodmern?retryWrites=true&w=majority"

const createConnection = async () => {
     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {

          if (err)
               console.log("something went wrong plz try again", err)
          else {
               console.log("Connected successfully");

               const fetched_data = await mongoose.connection.db.collection("sample"); //thes data itms coming form "sample"_collection
               fetched_data.find({}).toArray(async function (err, data) {

                    const fetched_category = await mongoose.connection.db.collection("category");//thse data comming "categroy"_collection
                    fetched_category.find({}).toArray(function (err, data2) {

                         if (err)
                              console.log(err);
                         else
                              //  console.log(data)  
                              global.food_items = data; //here we declaring globle variable which can updata/use anywhere in our application and assining to that variabel "data" 
                              global.food_category = data2; //here we assining to globale variable category collection entire data 

                    })

               })


          }
     });
}
module.exports = createConnection;




























