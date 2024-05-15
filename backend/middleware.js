const jose = require('jose')
const { JWT_SECRET } = require("./config")


const authMiddleware = async (req, res, next) => {
    try{        
        let jwtToken = req.headers.authorization;
        
        jwtToken = jwtToken.split(" ")[1];
        
        // const decoded = jwt.verify(jwtToken, JWT_SECRET);
        const decoded = await jose.jwtVerify(jwtToken, new TextEncoder().encode(JWT_SECRET));
        req.userId = decoded.payload.userId;
        next();
    }
    catch(err){
        return res.status(403).json({message: "Authentication Failed"});
    }
};

module.exports = {
    authMiddleware
}