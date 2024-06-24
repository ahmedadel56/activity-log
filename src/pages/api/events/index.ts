import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { actorId, actorName, group, actionId, actionName, targetId, targetName, location, metadata } = req.body;
    const event = await prisma.event.create({
      data: { actorId, actorName, group, actionId, actionName, targetId, targetName, location, metadata },
    });
    res.status(201).json(event);
  } else if (req.method === 'GET') {
    const { page = 1, limit = 10, search, actorId, targetId, actionId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const searchFilter = search ? {
      OR: [
        { actorName: { contains: String(search) } },
        { targetName: { contains: String(search) } },
        { actionName: { contains: String(search) } },
      ]
    } : {};

    const filters = {
      AND: [
        actorId ? { actorName: String(actorId) } : {},
        targetId ? { targetName: String(targetId) } : {},
        actionId ? { actionName: String(actionId) } : {},
        searchFilter
      ],
    };

    const events = await prisma.event.findMany({
      where: filters,
      skip,
      take: Number(limit),
      orderBy: { occurredAt: 'desc' },
    });

    const total = await prisma.event.count({ where: filters });
    
    res.status(200).json({ events, total, page: Number(page), limit: Number(limit) });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
