// import User from "../models/usermodels.js"; 
import Allusers from "../models/allusersmodels.js";
import jwt from 'jsonwebtoken';


// const jwt = require('jsonwebtoken');

//  export  async function  userRegistration(req,res){
 
//     try {
//         const userData = req.body;
  
//         const findUser = await Allusers.findOne({ userName: userData.userName,password:userData.password });
//         if (findUser){
         
//          console.log("there is already an user")
//         }else{
//           const user = await Allusers.create({ ...userData });
//           const userId = user._id
//           return {
//             message: 'user created',
//             userId:userId
//           };
//         }

//         res.send(userRegistration);
//       } catch (error) {
//         throw error
//       }
//   }

export async function userRegistration(req, res) {
    try {
      const userData = req.body;
  
      // Check if the user with the same username and password exists
      const findUser = await Allusers.findOne({
        userName: userData.userName,
        password: userData.password,
      });
  
      if (findUser) {
        // User already exists
        return res.status(409).json({ message: 'User already exists' });
      } else {
        // Create a new user
        const user = await Allusers.create({ ...userData });
        const userId = user._id;
  
        // Respond with success message
        return res.status(201).json({
          message: 'User created successfully',
          userId: userId,
        });
      }
    } catch (error) {
      console.error('Error in user registration:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }



//   export  async function  login(req,res){
 
//     try {

//         const loginData = req.body;

//         const user = await Allusers.findOne({ _id: loginData.userId,userName:loginData.userName,password:loginData.password });
//         if (!user) {
//           cosnole.log("enter valid data")
//         }else{
//         const token = jwt.sign({ id: user._id }, "secrettt");
//         const role = user.role;
//         return {
//           message: 'Login Success',
//           role,
//           token,
//         };
//     }
//         res.send(login)
//       } catch (error) {
//         throw error
//       }
//   }

export async function login(req, res) {
    try {
      const loginData = req.body;
  
      // Find the user by username and password
      const user = await Allusers.findOne({
        userName: loginData.userName,
        password: loginData.password,
      });
  
      if (!user) {
        // User not found, return an error response
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // User found, generate a JWT token
      const token = jwt.sign({ id: user._id }, 'thesecret');
  
      // Respond with success message, user role, and the token
      return res.status(200).json({
        message: 'Login Success',
        role: user.role,
        token: token,
      });
    } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


 