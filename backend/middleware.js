
const jwt = require("jsonwebtoken")
const jose = require('jose')
const { JWT_SECRET } = require("./config")


const authMiddleware = (req, res, next) => {
    try{        
        let jwtToken = req.headers.authorization;
        
        jwtToken = jwtToken.split(" ")[1];
        
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}