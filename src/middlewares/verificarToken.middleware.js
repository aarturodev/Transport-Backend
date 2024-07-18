// middleware para verificar el token
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {

     if(!req.headers.authorization){
          return res.status(401).json({ message: 'Invalid token' });
     }


     try{
          const accesToken = req.headers?.authorization.split(' ')[1];
          jwt.verify(accesToken, process.env.SECRET_KEY)
          next();

     }
     catch(error){
          return res.status(401).json({ message: 'Invalid token' });
     }
}