import  Express  from "express";
import {login, userRegistration} from "../controllers/authController.js";
import { authorizeRoles } from "../authorization/authorize.js";

const authRoute=Express()

authRoute.post('/register',authorizeRoles(["user","admin"]),userRegistration);
authRoute.post('/login',authorizeRoles(["user","admin"]),login);

export default authRoute 
