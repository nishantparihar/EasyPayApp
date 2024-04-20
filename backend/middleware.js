
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")


const authMiddleware = (req, res, next) => {
    try{        
        const jwtToken = req.headers.authorization;
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