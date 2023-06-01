const { db } = require('../src/utils/db');

const dayjs = require('dayjs');

const userData = [
  {
    pseudo: 'Alice',
    email: 'alice@prisma.io',
    password: 'azerty',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    pseudo: 'Nilu',
    email: 'nilu@prisma.io',
    password: 'azerty',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    pseudo: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: 'azerty',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await db.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
