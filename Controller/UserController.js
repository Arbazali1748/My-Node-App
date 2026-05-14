import prisma from "../DB/db.config.js";

// Create User Api
export const usercreated = async (req, resp) => {

    try {

        const {
            name,
            email,
            password,
            age,
            is_active,
            balance
        } = req.body;

        const finduser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (finduser) {
            return resp.status(400).json({
                message: "Email Already Exist."
            });
        }

        const createnewuser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                age: Number(age),
                balance,
                is_active
            }
        });

        return resp.status(200).json({
            data: createnewuser
        });

    } catch (error) {

        console.error(error);

        return resp.status(500).json({
            message: error.message
        });
    }
};

//  Update User Api
export const userUpdate = async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        // email check
        if (req.body.email) {
            const emailTaken = await prisma.user.findUnique({
                where: { email: req.body.email }
            });

            if (emailTaken && emailTaken.id !== id) {
                return resp.status(400).json({
                    message: "Email already in use"
                });
            }
        }

        const updated = await prisma.user.update({
            where: { id },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age ? Number(req.body.age) : undefined,
                is_active: req.body.is_active,
                balance: req.body.balance ? Number(req.body.balance) : undefined
            }
        });

        return resp.json({ data: updated });

    } catch (error) {
        return resp.status(500).json({ message: error.message });
    }
};

// Get User Api
export const getUser = async (req, resp) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id }
    });

    return resp.json({ data: user });

};

// Get UserList Api
export const getUserList = async (req, resp) => {
    const [users, totalCount] = await Promise.all([
        prisma.user.findMany(),
        prisma.user.count()
    ]);

    return resp.json({
        status: 200,
        message: "User List",
        data: users,
        total: totalCount
    });
};

// Delete User Api
export const deleteUser = async (req, resp) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id }
    });
    if (!user) {
        return resp.status(404).json({ message: "User not found" });
    }
    await prisma.user.delete({
        where: { id }
    });
    return resp.json({
        status: 200,
        message: "User deleted successfully"
    });
};