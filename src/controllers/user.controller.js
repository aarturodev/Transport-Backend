import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export class UserController {

     static async login(req, res) {
          const { username, password } = req.body;

          try{
               const user = await UserModel.login(username, password);
               if(!user){
                    return res.status(401).send({ message: 'Invalid credentials' });
               }

               const SECRET_KEY = process.env.SECRET_KEY;
               const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;

               const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
               const refreshToken = jwt.sign({ user }, SECRET_KEY_REFRESH, { expiresIn: '1d' });
              
               return res.send({user, token, refreshToken});
          
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }
     
}