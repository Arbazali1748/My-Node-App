import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

console.log("Prisma connected");

export default prisma;