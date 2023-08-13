const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken')



exports.getAlluser=async(req,res,next)=>{
           //Store req id
            const id = req.query.id;
            // If id  req than  find by id
        if(req.query.id){
            //Find user in User By id
        User.findById(id)
            .then(data =>{
                // Than res Data that has user data
                if(!data){
                    // If not than throw no user message
                    res.status(404).send({ message : "No user find with id "+ id})
                }else{
                    // If yes than send data
                    res.send(data)
                }
            })
            .catch(err =>{
                // If any kind of problem in that proccess than show err
                res.status(500).send({ message: "Something wrong in ID " + id})
            })

    }else{
        // If no req id than find all users
        User.find()
            .then(user => {
                // send user
                res.send(user)
            })
            .catch(err => {
                // if any problem than show
                res.status(500).send({ message : err.message || "No users exist now" })
            })
    }
}


// Create user and save to the database
exports.signup= async(req,res,next)=>{
    // destructe all req from body that store all req of user
  const { firstname, lastname, email, password } = req.body;
   
  // find existing user by email
  let existingUser;

  try {
    //find existing user by email on database
    existingUser = await User.findOne({ email: email });

  } catch (error) {
    // in find existing user have any kid of problem tha show
    console.log(error);
  }
  // if user exists, throw a message
  if (existingUser) {
    return res.status(422).send({ message: "User already exists" });
  }
  // Hash the password of user show that not identify it easly
  const hashedPassword = await bcrypt.hash("password",10);
  // if user does not exist, create and save user to database
  //new user
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword
  })
   
  // Create token
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h"
  });
  //save the token
  user.token=token;
  //save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong in creation of new user"
      });
    });
}


// login controller
exports.login=async(req,res,next)=>{
  // destructe all req from body that store all req of user
  const { email, password } = req.body;
  //create a variable that store existing user data
  let existingUser;
  // find existing user by email
  try {
    existingUser = await User.findOne({ email: email })

    // if user does not exist, throw message
    if (!existingUser) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
   /*  console.log(existingUser.password)
    const hashedPassword = await bcrypt.hash('password', 10);
    // compare password that req and has in soter in database and return true or false
    console.log(hashedPassword) */
/* 
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    ); */
     // if user and password both exist than
    if(existingUser.password===password){

      // Create token
      const token = jwt.sign(
        { user_id: existingUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      );
      existingUser.token = token;
    }
     if(existingUser.token===token){

       return res.redirect("http://localhost:3000/admin");
     }
      // store that token in database
      // send message
    
    // if not find user than send message
    return res.status(400).send({ message: "not able to login" });
  } catch 
    (err)  {
        //if any kind of problem than show
      console.log(err);
    
  }
}




// Update a new idetified user by user id as PUT and patch method both
exports.update = async(req, res,next)=>{
   // if not req by body than
    if(!req.body){
        // send message
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
     // collect id that req by user
    const id = req.params.id;
    // find and updata user respect to that id
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            // res user data
            if(!data){
                // if not than throw a message
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                // else send data
                res.send(data)
            }
        })
        .catch(err =>{
            // if any kind of problem in that proccess than send a message
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res,next)=>{
    // Store req id
    const id = req.params.id;
     // find and delete user respecte to that id
    User.findByIdAndDelete(id)
        .then(data => {
            // res data of that user
            if(!data){
                // if not than send a message 
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                //else send deleted
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            // if any problem in that process than send a message
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}