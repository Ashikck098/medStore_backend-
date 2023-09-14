import  Express  from "express";
import { addProduct, deleteProduct, getAllProduct, getsingleProduct, searchProduct, updateProduct } from "../controllers/productsController.js";
import multer from 'multer';

const productsRoute=Express()
const upload = multer({ storage: multer.diskStorage({}) }); 

productsRoute.post('/addproducts',upload.array("image"),addProduct);
// productsRoute.post('/addproductsImage',upload.array("image"),addProductImage);
productsRoute.post('/updateproducts',updateProduct);
productsRoute.post('/searchproducts',searchProduct);
productsRoute.post('/getproductsingle/:id',getsingleProduct);
productsRoute.get('/getallproducts',getAllProduct);
productsRoute.delete('/deleteproduct/:id',deleteProduct);
// productsRoute.get('/getproducts',getProduct);
// productsRoute.get('/getsingleproduct/:id',getSingleProduct);



export default productsRoute 