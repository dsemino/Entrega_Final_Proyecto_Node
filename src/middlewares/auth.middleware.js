import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    // Obtener el encabezado de autorización
    const authHeader = req.headers['authorization'];
    
    // Validar si el header existe y si arranca con la palabra "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {//split(" ") [1]){ 
        return res.status(403).json({ error: "Acceso denegado. Formato de token inválido o inexistente." });
    }

    // Extraer limpiamente el token (sacando la palabra 'Bearer')
    const token = authHeader.split(' ')[1]; //

    try {
        const secretKey = process.env.JWT_SECRET || 'ClaveSecretaDeRespaldo123';
        // Verificar el token usando la firma secreta
        const verified = jwt.verify(token, secretKey);
        req.user = verified; //
        next(); // Permitir el acceso al controlador
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado." });
    }
};

