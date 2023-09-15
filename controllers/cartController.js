// import User from "../models/usermodels.js"; 
import Allusers from "../models/allusersmodels.js";
import Cart from "../models/cartmodels.js";
import Products from "../models/productsmodels.js";




// export async function addCart(req, res,next) {
//   try {
//     const cartData = req.body;        
//     const user = await Cart.findOne({user: cartData.userId});
//     if(user){
//     const product = await Products.findById({_id:cartData.productId})
//     if(product){
//        product.count-cartData.selectedCount
//        product.save()
//     }
//     user.cart.push(cartData.cart)
//     user.save()
//     }else{
//       const createCartData= await Cart.create({ ...cartData });
//       return createCartData 
      
//     } 

//     res.status(200).json( createCartData )
//   } catch (error) {
//     next(error)
//   }
//   }

// export async function addCart(req, res, next) {
//   try {
//     const cartData = req.body;

//     // Check if a cart already exists for the user
   
//     const Cartavailable = await Cart.findOne({user:cartData.user});
//     console.log("aaaaaaaaa",cartData.cart[0].productId)
//     const productavailabe = await Products.findOne({_id:cartData.cart[0].productId})
    
    
// // console.log(user)
//     if (Cartavailable) {
//       if(productavailabe){
//       productavailabe.count - cartData.cart.selectedCount
//     await productavailabe.save()

//       Cartavailable.cart.push(...cartData.cart)
//     await  Cartavailable.save()
//       }else{
//         throw "there is no product available"
//       }
    
//     }else{
//       const addcart = await Cart.create(cartData);
//       productavailabe.count - cartData.cart.selectedCount
//      await productavailabe.save()

 
//       res.status(200).json(addcart);
//     }
    
//   } catch (error) {
//     next(error); // Handle errors appropriately
//   }
// }


export async function addCart(req, res, next) {
  try {
    const cartData = req.body;

    // Check if a cart already exists for the user
    const cartAvailable = await Cart.findOne({ user: cartData.user });
    const productId = cartData.cart[0].product;
    const productAvailable = await Products.findById(productId);

    if (cartAvailable) {
      if (productAvailable) {
        // Update product count correctly
        productAvailable.count -= cartData.cart[0].selectedCount;
        await productAvailable.save();

        // Add items to the user's cart
        cartAvailable.cart.push(...cartData.cart);
        await cartAvailable.save();
        res.status(200).json(cartAvailable);
      } else {
        throw new Error("There is no product available.");
      }
    } else {
      // Create a new cart for the user
      const newCart = await Cart.create(cartData);

      if (productAvailable) {
        // Update product count correctly
        productAvailable.count -= cartData.cart[0].selectedCount;
        await productAvailable.save();
      } else {
        throw new Error("There is no product available.");
      }

      res.status(200).json(newCart);
    }
  } catch (error) {
    next(error); // Handle errors appropriately
  }
}


// export async function getSingleCart(req, res, next) {
//   try {
//     const userId = req.body.userId
//     // if (!userId) throw error(400, "Not a valid userid");

//     const findCart = await Cart.findOne({ user: userId });
//     const cartcount = findCart.length
//     // if (!findCart) throw error(409, "Not a valid Cart");
    
//       res.status(200).json(findCart,cartcount);
    
//   } catch (error) {
//     next(error); // Handle errors appropriately
//   }
// }

export async function getSingleCart(req, res, next) {
  try {
    const userId = req.body.userId;

  
    // if (!userId) throw error(400, "Not a valid userid");

    const findCart = await Cart.findOne({ user: userId });
    if (!findCart) {
      return res.status(404).json({ message: ' no cart found' });
    }
    const cartcount = findCart ? findCart.cart.length : 0; // Check if findCart is not null

    // if (!findCart) throw error(409, "Not a valid Cart");

    res.status(200).json({ findCart, cartcount }); // Send an object as the response
  } catch (error) {
    next(error); // Handle errors appropriately
  }
}

 