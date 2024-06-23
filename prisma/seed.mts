// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        actorId: 'user_3VG74289PUA2',
        actorName: 'Ali Salah',
        group: 'instatus.com',
        actionId: 'evt_action_PGTD81NCAOQ2',
        actionName: 'user.login_succeeded',
        targetId: 'user_DOKVD1U3L030',
        targetName: 'ali@instatus.com',
        location: '105.40.62.95',
        metadata: {
          redirect: '/setup',
          description: 'User login succeeded.',
          x_request_id: 'req_W1Y13QOHMI5H',
        },
        occurredAt: new Date('2022-01-05T14:31:13.607Z'),
      },
      {
        actorId: 'user_4DG89290FPA3',
        actorName: 'John Doe',
        group: 'instatus.com',
        actionId: 'evt_action_PGTZ82NDAOQ3',
        actionName: 'incident.created',
        targetId: 'incident_2HDKD89B1CDA',
        targetName: 'Database downtime',
        location: '192.168.1.1',
        metadata: {
          description: 'Created a new incident for database downtime.',
          x_request_id: 'req_X1Z45GDKJO3F',
        },
        occurredAt: new Date('2022-01-06T10:20:30.000Z'),
      },
      {
        actorId: 'user_5GH30927GPA4',
        actorName: 'Jane Smith',
        group: 'instatus.com',
        actionId: 'evt_action_PGTZ82NDAOQ4',
        actionName: 'teammate.deleted',
        targetId: 'user_Y2KD83L10OPW',
        targetName: 'jane@instatus.com',
        location: '172.16.254.1',
        metadata: {
          description: 'Deleted a teammate from the team.',
          x_request_id: 'req_Q5D98HJKPI4B',
        },
        occurredAt: new Date('2022-01-07T12:45:00.000Z'),
      },
      // Add more events as needed
    ],
  });

  console.log('Test data inserted');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
