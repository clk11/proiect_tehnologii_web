import jwt from 'jsonwebtoken';
import dotnev from 'dotenv'
dotnev.config();
export default (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res
            .status(401)
            .json({ err: 'Access denied , no token provided ...' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ err: 'Token is not valid ' });
    }
};