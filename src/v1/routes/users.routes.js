import express from "express";
import {getUsers, loginUser, regUser,ValidateEmail, ValidateCod, UpdateUserData, getUserxId, deleteUser} from "../../controllers/users.controller.js"
import { verifyToken } from "../../middlewares/verifyToken.js";
import { adminPermiso } from "../../middlewares/managePermissions.js";
import {validateCreate , validateUpdate, validateLogin, validateEmail, validateCodIp} from "../../validators/users.validators.js";

const userRoutes = express();

userRoutes.get('/api/v1/users', verifyToken, adminPermiso, getUsers);

//get user by id ---ok ---

userRoutes.get('/api/v1/users/:id', verifyToken, getUserxId);

//login user ---OK ---


userRoutes.post('/api/v1/login',validateLogin, loginUser);

//User Register ---ok--

userRoutes.post('/api/v1/register',validateCreate, regUser);

//validate Email to Register-- 0K

userRoutes.post('/api/v1/email_validate',validateEmail, ValidateEmail);

//validate codes to login Ip new


userRoutes.post('/api/v1/ip_validation',validateCodIp, ValidateCod);

//update user data


userRoutes.put('/api/v1/users/update/:id',validateUpdate,verifyToken, adminPermiso, UpdateUserData)

//delete user


userRoutes.delete('/api/v1/users/delete/:id',verifyToken, adminPermiso, deleteUser)



export default userRoutes;