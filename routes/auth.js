import  Express  from "express";
import {login, userRegistration} from "../controllers/authController.js";

const authRoute=Express()

authRoute.post('/register',userRegistration);
authRoute.post('/login',login);


export default authRoute 
