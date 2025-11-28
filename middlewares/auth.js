import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded.id; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
export default auth;
