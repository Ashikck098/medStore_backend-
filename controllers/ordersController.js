// import User from "../models/usermodels.js"; 
import Orders from "../models/ordersmodels.js";
import Products from "../models/productsmodels.js";
import mongoose from "mongoose";



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
    const orderedProductId = orderedProduct.product;
    // Check if orderedProductId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(orderedProductId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
console.log(orderedProductId)
    // Find the product by ID
    const foundProduct = await Products.findOne({ _id: orderedProductId });

    // Check if the product is found
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalpay = foundProduct.price * orderedProduct.purchasedCount  

    const Thetotalpay = {totalPay:totalpay}

    const orderedProducts = { ...orderedProduct, ...Thetotalpay };

    foundProduct.count -= orderedProduct.purchasedCount

    await foundProduct.save();

    // Create the ordered product
    const createOrderedProduct = await Orders.create(orderedProducts);

    // const totalPay = theOrder.product.price * paymentData.purchasedCount;
    // theOrder.totalPay = totalPay;

    // Respond with the created ordered product
    res.status(201).json({ createOrderedProduct, orderedproductid: createOrderedProduct._id });
  } catch (error) {
    // Handle unexpected errors and send a response
    console.error('Error adding orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



export async function getOrdersByUser(req, res, next) {
  try {
    const userId = req.body.userId;

    // if (!userId) throw error(400, "Not a valid userid");

    const Order = await Orders.find({ user: userId });
    if(!Order){
      return res.status(404).json({ message: 'orders not found' });
    }
    const Orderscount = Order ? Order.length : 0; 

   

    res.status(200).json({ Order, Orderscount }); // Send an object as the response
  } catch (error) {
    next(error); // Handle errors appropriately
  }
}


export async function getAllOrders(req, res, next) {
  try {
    const Order = await Orders.find().populate({
      path:'product',
      select:'productName'
  });
    if(!Order){
      return res.status(404).json({ message: 'orders not found' });
    }
    const Orderscount = Order ? Order.length : 0; 

    res.status(200).json({ Order, Orderscount }); 
  } catch (error) {
    next(error); 
  }
}



// export async function address(req, res, next) {
//   try {
   
//    const orderId = req.body.orderId
//     const address = req.body.address

//     const TheOrder = await Orders.findOne({_id:orderId})

//    const updatedAdress =  TheOrder.address = address

//    updatedAdress.save()

//    res.status(200).json(updatedAdress); // Send an object as the response
//   } catch (error) {
//     next(error); // Handle errors appropriately
//   }
// }


export async function address(req, res, next) {
  try {
    const orderId = req.body.orderId;
    const address = req.body.address;

    // Find the order by ID
    const theOrder = await Orders.findOne({ _id: orderId });

    if (!theOrder) {
      // Handle case where the order is not found
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the address field of the found order
    theOrder.address = address;

    // Save the updated order
    await theOrder.save();

    res.status(200).json(theOrder); // Send the updated order as the response
  } catch (error) {
    next(error); // Handle errors appropriately
  }
}

// export async function payment(req, res, next) {
//   try {
   
//     const orderId = req.body.orderId;
//     const paymentData = req.body.paymentData;

//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({ message: 'Invalid order ID' });
//     }
//     if(!paymentData){
//       return res.status(400).json({ message: 'Invalid paymentData' });
//     }

//     // Find the order by ID
//     const theOrder = await Orders.findOne({ _id: orderId }).populate({
//       path: 'product',
//       select: 'price'
//     });
   

//     if (!theOrder) {
//       // Handle case where the order is not found
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     // Update the address field of the found order

    
//     const totalPay = theOrder.product.price * paymentData.purchasedCount
//     theOrder.totalPay = totalPay

//     theOrder.purchasedCount = paymentData.purchasedCount;
//     theOrder.paymentMethod = paymentData.paymentMethod;
//     theOrder.paymentId = paymentData.paymentId;

//     // Save the updated order
//     await theOrder.save();
   

//     res.status(200).json(theOrder,{message:"payment done successfully"});  // Send an object as the response
//   } catch (error) {
//     next(error); // Handle errors appropriately
//   }
// }


export async function payment(req, res, next) {
  try {
    const orderId = req.body.orderId;
    const paymentData = req.body.paymentData;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    if (!paymentData) {
      return res.status(400).json({ message: 'Invalid paymentData' });
    }

    // Find the order by ID
    const theOrder = await Orders.findOne({ _id: orderId }).populate({
      path: 'product',
      select: 'price'
    });

    if (!theOrder) {
      // Handle case where the order is not found
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the address field of the found order
    // const totalPay = theOrder.product.price * paymentData.purchasedCount;
    // theOrder.totalPay = totalPay;
    // theOrder.purchasedCount = paymentData.purchasedCount;
    theOrder.paymentMethod = paymentData.paymentMethod;
    theOrder.paymentId = paymentData.paymentId;

    // Save the updated order
    await theOrder.save();

    // Send a JSON response with a status code and a message
    res.status(200).json({ message: 'Payment done successfully', order: theOrder });
  } catch (error) {
    next(error); // Handle errors appropriately
  }
}

export async function removeOrder(req, res, next) {
  try {
    const orderId = req.params.id; // Assuming the product ID is in the URL parameter

    // Check if productId is a valid ObjectId format (assuming you're using MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid Order ID' });
    }

    // Find the product by ID and delete it
    const deletedOrder = await Orders.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'order not found' });
    }

    // Respond with a success message or the deleted product
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    // Handle unexpected errors and pass them to the error handling middleware (next)
    next(error);
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


 