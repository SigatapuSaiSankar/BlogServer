import jwt from "jsonwebtoken";

export const authenticate = async(req, res, next) =>{
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer ")){
            return res.status(401).json({success: false,message:"Please Login first"});
            // authtoken will be empty if the user is not logged in 
            // because user will be given token only when user login 
    }

    try {
        const token = authToken.split(" ")[1];
        // we remove the first work that is Bearer
        // because the token when recieved from user contains the token name (type of token)
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        console.log(`decoded token: ${decoded}`);

        next();
    } catch (error) {
        return res.status(500).json({success: false,message:"server error"});
    }
}