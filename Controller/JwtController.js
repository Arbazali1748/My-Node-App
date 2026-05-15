import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserPermissions } from "./RoleBasePermissionController.js";
import { generateAccessToken } from "./Common.js";

//Register User Api
export const RegisterUser = async (req, resp) => {

    try {

        const { name, email, password, roleId } = req.body;

        // check existing user
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (userExist) {
            return resp.status(400).json({
                message: "Email already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId: roleId
            }
        });
        const permissions = await prisma.permissionMap.findMany();

        const rolePermissions = await Promise.all(
            permissions.map((perm) =>
                prisma.roleBasePermission.create({
                    data: {
                        roleId: roleId,
                        permissionMapId: perm.id,
                        status: true
                    }
                })
            )
        );
        // geenrteing token
        const accessToken = generateAccessToken(user);
        // get role name
        const userRoleName = await prisma.role.findUnique({
            where: {
                id: user.roleId
            }
        });

        // Get User Permissions
        const UserPermissions = await getUserPermissions(user.roleId);

        return resp.json({
            message: "User Registered Successfully.",
            accessToken,
            userData: {
                Id: user.id,
                name: user.name,
                email: user.email,
                rolename: userRoleName?.name,
                roleId: user.roleId,
                Permissions: UserPermissions
            }
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            message: "Server Error"
        });
    }
};

// Login User Api
export const Newlogin = async (req, resp) => {

    try {

        const { email, password } = req.body;

        // find user
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return resp.status(404).json({
                message: "User not found"
            });
        }

        // compare password
        const matchPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!matchPassword) {
            return resp.status(400).json({
                message: "Invalid Password"
            });
        }
        // geenrteing token
        const accessToken = generateAccessToken(user);

        //get rolename
        const userRoleName = await prisma.role.findUnique({
            where: {
                id: user.roleId
            }
        });

        const UserPermissions = await getUserPermissions(user.roleId);

        // Get Permission Here
        return resp.json({
            status: 200,
            message: "Login Success",
            token: accessToken,
            userData: {
                Id: user.id,
                name: user.name,
                email: user.email,
                rolename: userRoleName?.name,
                roleId: user.roleId,
                permissions: UserPermissions
            }
        }
        );

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            message: "Server Error"
        });
    }
};

