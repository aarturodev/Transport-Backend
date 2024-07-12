import { LoginModel } from "../models/login.model.js";
import jwt from 'jsonwebtoken';

export class LoginController {

     static async login(req, res) {

          const { username, password } = req.body;

          try{
               const user = await LoginModel.login(username, password);
               if(!user){
                    return res.status(401).send({ message: 'Invalid credentials' });
               }
               const token = jwt.sign(
                    { rol: user.Rol },"este es el secreto mas buscado de la historia",
                    { expiresIn: '1h' }

               );

               return res.send({user, token});
          
          }
          catch(error){
               return res.status(500).json({ message: 'Internal server error' });
          }

     }
}