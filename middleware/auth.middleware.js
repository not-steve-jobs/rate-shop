const jwt = require("jsonwebtoken");
const userModel = require('../models/DB_associations').User;

const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
            const user = await userModel.findOne({ where: {email: decoded.email} })
            if(!user) {
                return res.status(404).json({
                    message:'User not found'
                })
            }
            req.user = user;
            next();
        }
        else {
            throw new Error('User not authenticated')
        }
    }
    catch (e) {
        return res.status(400).json({message:e.message});
    }
};

module.exports = verifyToken;