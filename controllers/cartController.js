// import User from "../models/usermodels.js"; 
import Allusers from "../models/allusersmodels.js";
import Cart from "../models/cartmodels.js";
import Products from "../models/productsmodels.js";
import mongoose from "mongoose";


export async function addCart(req, res, next) {
  try {
    const cartData = req.body;

    // Check if a cart already exists for the user
    const userId = cartData.user
    const cartAvailable = await Cart.findOne({ user: userId });
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
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
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
    next(error); 
  }
}


export async function getSingleCart(req, res, next) {
  try {
    const userId = req.body.user;
    const findCart = await Cart.findOne({ user: userId });
    if (!findCart) {
      return res.status(404).json({ message: ' no cart found' });
    }
    const cartcount = findCart ? findCart.cart.length : 0; 
    res.status(200).json({ addedCart:findCart, totalcount:cartcount }); 
  } catch (error) {
    next(error); 
  }
}

 