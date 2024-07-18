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

               const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '30s' });
               const refreshToken = jwt.sign({ user }, SECRET_KEY_REFRESH);
              
               return res
               .cookie('refreshToken', refreshToken,{ httpOnly: true})
               .json({token});
          
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }

     static async logout(_req, res) {
          res.clearCookie('refreshToken');
          return res.json({ message: 'Logged out' });
     }

     static async refreshToken(req, res) {

          const { SECRET_KEY_REFRESH, SECRET_KEY } = process.env;
          const { refreshToken } = req.cookies;
          
          if(!refreshToken){
               return res.status(401).json({ message: 'Refresh Token no existe' });
          }

          jwt.verify(refreshToken, SECRET_KEY_REFRESH, (err, user) => {
               if(err){
                    return res.status(401).json({ message: 'Refresh token expiro' });
               }
               const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '30s' });
              
               return res.json({ token });
          });

          

     }
     
}