import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const slug = req.query.slug.toString();

        if (req.method === 'POST') {
            const updatedViews = await prisma.blogViews.upsert({
                where: { slug },
                create: {
                    slug,
                    views: 1
                },
                update: {
                    views: {
                        increment: 1
                    }
                }
            });

            return res.status(200).json({
                total: updatedViews.views
            });
        }

        if (req.method === 'GET') {
            const views = await prisma.blogViews.findUnique({
                where: {
                    slug
                }
            });

            return res.status(200).json({ total: views?.views ?? 0 });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}