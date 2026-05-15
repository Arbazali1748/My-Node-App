import jwt from "jsonwebtoken";

//verify token and authenticate user
const authMiddleware = (req, resp, next) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return resp.status(401).json({
                message: "UnAuthorized User"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verifyToken;
 
    
        next();

    } catch (error) {

        return resp.status(401).json({
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;