import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// run inside `async` function
prisma.$connect();

export default prisma;
