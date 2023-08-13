//require express
// Here require use as to load modules abd make it awailable in the application
const express=require('express')
const dotenv=require('dotenv');
const morgan=require('morgan');

//path module able to provides path and resolve working path
const path=require('path');
const connectDB=require('./server/database/connection');
// bodyparser  set request bodies and awailable in req.body property
const bodyparser=require('body-parser');
// require cors
const cors=require('cors');
// dotenv configuration
dotenv.config({path:'config.env'});
// Port get through 
const PORT=process.env.PORT || 8000;
// create express app
const app=express();
// that allow to show all req in console
app.use(morgan('tiny'));
//CORS Cross-Origin Resource Sharing that allow to able  send request  by front-end client to external server
app.use(cors()) ;
// that use json formate(as convert json to javascript acceseble )
app.use(bodyparser.json()) 
//thats allow to use all type of data 
app.use(bodyparser.urlencoded({extended:true}));
//connect mongodb
connectDB();

// allow to use router folder
app.use('/', require('./server/routes/router'));


app.listen(PORT,(req,res)=>{
            console.log(`Server is running on http://localhost:${PORT}`)
})

