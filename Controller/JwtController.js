import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "./Common.js";

//Register User Api
export const RegisterUser = async (req, resp) => {

    try {

        const { name, email, password } = req.body;

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
                password: hashedPassword
            }
        });

        // geenrteing token
        const accessToken = generateAccessToken(user);


        return resp.json({
            message: "User Registered",
            accessToken,
            user
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

        return resp.json({
            status: 200,

            message: "Login Success",
            accessToken
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            message: "Server Error"
        });
    }
};

