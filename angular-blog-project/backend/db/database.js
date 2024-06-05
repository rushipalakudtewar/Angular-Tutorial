const mongoose= require('mongoose');

const connectDB =() => {
    try
    {
        mongoose.connect(`${process.env.MONGOURL}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then((data)=>{
            console.log(`Mongodb connected on ${data.connection.host}`);
        })
       }  
    catch(err){
           console.log(`Failed to connect DB ${err}`);
           process.exit(1);
    }    
}
   


module.exports = connectDB;