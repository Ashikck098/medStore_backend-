import  Express  from "express";
import { addCart, getSingleCart } from "../controllers/cartController.js";
import { authorizeRoles } from "../authorization/authorize.js";

const cartRoute=Express()

cartRoute.post('/addCart',authorizeRoles(["user","admin"]),addCart);
cartRoute.get('/getSingleCart',authorizeRoles(["user","admin"]),getSingleCart);

export default cartRoute 
