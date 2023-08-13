const mongoose=require('mongoose');


const connectDB = async()=>{
            try {
                   const connect = await mongoose.connect('mongodb+srv://sunnykumar23232:aQ2yMhcsIBQjNzC4@cluster0.4de6xyr.mongodb.net/?retryWrites=true&w=majority') ;
                   console.log(`MongoDB connected: ${connect.connection.host}`)

            } catch (error) {
                        console.log(error);
                        process.exit(1);
                        
            }
}
module.exports=connectDB;       


