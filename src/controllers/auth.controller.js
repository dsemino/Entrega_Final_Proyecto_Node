import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Forzar la lectura del archivo .env en la raíz
dotenv.config();

//const secret_key = process.env.JWT_SECRET_KEY;

//const USER_TEST = {
//    email: "admin@techlab.com",
//    password: "Password123"
//};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios." });
        }

        const validEmail = process.env.USER_EMAIL;
        const validPassword = process.env.USER_PASSWORD;

        if (email !== validEmail || password !== validPassword) {
            return res.status(401).json({ error: "Credenciales incorrectas." });
        }

        // Generar Token JWT con una clave por defecto si el .env no cargó a tiempo
        const secretKey = process.env.JWT_SECRET || 'ClaveSecretaDeRespaldo123';

        const token = jwt.sign(
            { email: validEmail, role: "admin" },
            secretKey,
            { expiresIn: '2h' }
        );

        // Responder explícitamente devolviendo el JSON con el token
        return res.status(200).json({
            message: "Login exitoso",
            token: token
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
