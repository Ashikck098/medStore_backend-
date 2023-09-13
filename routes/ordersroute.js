import  Express  from "express";
import { addOrders, getSingleOrder } from "../controllers/ordersController.js";

const ordersRoute=Express()

ordersRoute.post('/addorder',addOrders);
ordersRoute.delete('/cancelorder',deleteProduct);
ordersRoute.get('/getorders',getProduct);
ordersRoute.get('/getsingleproduct/:id',getSingleOrder);



export default ordersRoute 
