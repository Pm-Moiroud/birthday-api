const { getStatusBySlug } = require('../src/api/services/StatusServices');
const { db } = require('../src/utils/db');

const dayjs = require('dayjs');
const bcrypt = require('bcrypt');

const defaultPassword = bcrypt.hashSync('azerty', 12);
const userData = [
  {
    pseudo: 'Alice',
    email: 'alice@prisma.io',
    password: defaultPassword,
    canReceiveEmailNotif: true,
    canReceivePushNotif: true,
  },
  {
    pseudo: 'Nilu',
    email: 'nilu@prisma.io',
    password: defaultPassword,
    canReceiveEmailNotif: true,
    canReceivePushNotif: true,
  },
  {
    pseudo: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: defaultPassword,
    canReceiveEmailNotif: true,
    canReceivePushNotif: true,
  },
  {
    pseudo: 'Admin',
    email: 'admin@admin.fr',
    password: defaultPassword,
    canReceiveEmailNotif: true,
    canReceivePushNotif: true,
  },
];

const birthdayData = [
  {
    name: 'Anniversaire Alice',
    started_at: dayjs().format(),
    ended_at: dayjs().add(1, 'hour').format(),
    reminder_push: 0,
    reminder_email: 0,
  },
  {
    name: 'Anniversaire Nilu',
    started_at: dayjs().format(),
    ended_at: dayjs().add(1, 'hour').format(),
    reminder_push: 0,
    reminder_email: 0,
  },
];

const statusData = [
  {
    label: 'pending',
    slug: 'pending',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    label: 'processing',
    slug: 'processing',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
  {
    label: 'closed',
    slug: 'closed',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  },
];

async function main() {
  await db.user.deleteMany({});
  await db.birthday.deleteMany({});
  await db.status.deleteMany({});
  try {
    console.log(`Start seeding ...`);
    for (const s of statusData) {
      const status = await db.status.create({
        data: s,
      });
      console.log(`Created status with id: ${status.id}`);
    }
    const defaultStatus = await getStatusBySlug('pending');

    for (const u of userData) {
      const user = await db.user.create({
        data: u,
      });
      for (const b of birthdayData) {
        const birthday = await db.birthday.create({
          data: {
            ...b,
            userId: user.id,
            statusId: defaultStatus.id,
          },
        });
        console.log(`Created birthday with id: ${birthday.id}`);
      }
      console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
  } catch (e) {
    console.error(e);
  }
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
