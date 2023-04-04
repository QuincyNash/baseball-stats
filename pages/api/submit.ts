// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { Input } from "..";

type Data = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let result = {};

	if (req.body) {
		let data = JSON.parse(req.body);
		let inputs: Input[] = data.inputs;

		result = { inputs: inputs };
	}

	res.status(200).json(result);
}
