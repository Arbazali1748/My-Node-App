// authoreization middleware to restrict access to admin-only routes
const adminOnly = (req, res, next) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access Denied: Admin Only"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export default adminOnly;