// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { Input, Pitcher, GameInfo } from "..";

type Data = { message: string };
const INVALID = "Invalid Request";
const SUCCESS = "Success";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	function loadJSON(req: NextApiRequest) {
		try {
			const data = JSON.parse(req.body);
			return data;
		} catch (e) {
			res.status(400).json({ message: INVALID });
		}
	}

	if (!req.body) {
		res.status(400).json({ message: INVALID });
	}

	const data = loadJSON(req);
	const inputs: Input[] = data.inputs;
	const pitchers: Pitcher[] = data.pitchers;
	const gameInfo: GameInfo = data.gameInfo;
	const innings: string[] = data.innings;

	if (!inputs || !pitchers || !gameInfo || !innings) {
		res.status(400).json({ message: INVALID });
	}

	res.status(200).json({ message: SUCCESS });
}
