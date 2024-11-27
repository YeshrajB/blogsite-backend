const jwt = require('jsonwebtoken');

async function decodeToken(authToken) {
    const secretKey = process.env.SECRET_KEY;
    if(!secretKey){
        throw new Error("Secret key not found!");
    }
    return jwt.verify(authToken, secretKey);      
}

const validateJWT = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const token = authHeader && authHeader.split('Bearer ')[1];
        if(!token) {
            return res.status(401).send("Unauthorised!");
        }
        const decodedToken = await decodeToken(token);

        const { id , role } = decodedToken;
        console.log(id, role);
        req.userId = id;
        req.userRole = role;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({ error: "Unauthorised!", message: "Invalid auth token" });   
        }
        console.log("Error occur while decoding jwt token!" + error);
        return res.status(500).send("Internal server error!");
    }
}

module.exports = { validateJWT };