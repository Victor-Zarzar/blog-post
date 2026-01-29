import type { PrismaClient } from "@prisma/client";

const email = "test@example.com";

const seedUsers = async (prisma: PrismaClient) => {
    const start = Date.now();
    console.log("Seeding users...");

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Test User",
        },
    });

    const end = Date.now();
    console.log(`Seeding users completed in ${end - start}ms`);

    return user;
};

export default seedUsers;
