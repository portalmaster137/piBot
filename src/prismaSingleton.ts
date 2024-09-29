import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export default async function getPrismaClient() {
    if (!prisma) {
        prisma = new PrismaClient();
        await prisma.$connect();
    }
    return prisma;
}
