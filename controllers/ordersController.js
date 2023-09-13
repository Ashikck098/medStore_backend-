// import User from "../models/usermodels.js"; 
import Orders from "../models/ordersmodels.js";
import Products from "../models/productsmodels.js";



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

// export async function addOrders(req, res) {
   

//   const orderedProduct = req.body
//   const orderedProductId = req.body.productId
//     const findProduct = await Products.findOne({
//     _id: orderedProductId 
//   });

//   if(!findProduct){
//      throw "there is no product"
//   }
//   const createOrderedProcuts= await Orders.create(...orderedProduct)
//   res.send(createOrderedProcuts)
//   }


export async function addOrders(req, res) {
  try {
    const orderedProduct = req.body;
    const orderedProductId = orderedProduct.productId;

    // Check if orderedProductId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(orderedProductId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by ID
    const foundProduct = await Products.findOne({ _id: orderedProductId });

    // Check if the product is found
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create the ordered product
    const createOrderedProduct = await Orders.create(orderedProduct);

    // Respond with the created ordered product
    res.status(201).json(createOrderedProduct);
  } catch (error) {
    // Handle unexpected errors and send a response
    console.error('Error adding orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



export async function getSingleOrder(req, res, next) {
  try {
    const userId = req.body.userId;

    // if (!userId) throw error(400, "Not a valid userid");

    const Orders = await Orders.find({ user: userId });
    if(!Orders){
      
    }
    const Orderscount = Orders ? Orders.length : 0; 

   

    res.status(200).json({ Orders, Orderscount }); // Send an object as the response
  } catch (error) {
    next(error); // Handle errors appropriately
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

// export async function login(req, res) {
//     try {
//       const loginData = req.body;
  
//       // Find the user by username and password
//       const user = await Allusers.findOne({
//         userName: loginData.userName,
//         password: loginData.password,
//       });
  
//       if (!user) {
//         // User not found, return an error response
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
  
//       // User found, generate a JWT token
//       const token = jwt.sign({ id: user._id }, 'secrettt');
  
//       // Respond with success message, user role, and the token
//       return res.status(200).json({
//         message: 'Login Success',
//         role: user.role,
//         token: token,
//       });
//     } catch (error) {
//       console.error('Error in login:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }


 