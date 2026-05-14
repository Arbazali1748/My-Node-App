// for neon, we need to use the connection string provided by Neon
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adapter = new PrismaPg(pool);

// Singleton pattern to ensure Prisma is instantiated only once
let prisma;

if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient({
    adapter,
    log: ["query"],
  });
  global.prisma = prisma;
}

export default prisma;

// for local development, we can use localhost

// import pkg from "@prisma/client";
// const { PrismaClient } = pkg;

// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// const connectionString = process.env.DATABASE_URL;

// const pool = new Pool({ connectionString });

// const adapter = new PrismaPg(pool);

// const prisma = new PrismaClient({
//     adapter,
//     log: ['query'],
// });

// export default prisma;

// for neon, we need to use the connection string provided by Neon
