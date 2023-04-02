// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Data = {
	result: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let result = await prisma.batter.findMany({});

	res.status(200).json({ result: result });
}
