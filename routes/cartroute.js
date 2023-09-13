import  Express  from "express";
import { addCart, getSingleCart } from "../controllers/cartController.js";

const cartRoute=Express()


cartRoute.post('/addCart',addCart);
cartRoute.post('/getSingleCart',getSingleCart);


export default cartRoute 
