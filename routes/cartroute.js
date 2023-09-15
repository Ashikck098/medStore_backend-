import  Express  from "express";
import { addCart, getSingleCart } from "../controllers/cartController.js";
import { authorizeRoles } from "../authorization/authorize.js";

const cartRoute=Express()

cartRoute.post('/addCart',addCart);
cartRoute.post('/getSingleCart',authorizeRoles(["user","admin"]),getSingleCart);
// authorizeRoles(["user","admin"])

export default cartRoute 
