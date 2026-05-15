import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.roleId,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

