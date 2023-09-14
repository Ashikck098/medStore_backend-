import  Express  from "express";
import { addOrders, address, getAllOrders, getOrdersByUser, payment, removeOrder } from "../controllers/ordersController.js";

const ordersRoute=Express()

ordersRoute.post('/addorder',addOrders);
// ordersRoute.delete('/cancelorder',deleteProduct);
ordersRoute.post('/getsingleorders',getOrdersByUser);
ordersRoute.get('/getsingleproduct/:id',getAllOrders);
ordersRoute.post('/address/',address);
ordersRoute.post('/payment/',payment);
ordersRoute.delete('/removeorder/:id/',removeOrder);



export default ordersRoute 
