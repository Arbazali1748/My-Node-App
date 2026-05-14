import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable. Set it in Vercel or .env.");
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString,
    }),
});

console.log("Prisma connected");

export default prisma;