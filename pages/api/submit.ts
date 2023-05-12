import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaPromise } from "@prisma/client";
import { Input, Pitcher, GameInfoInput, Inning, Hand, Ranking } from "..";
import { prisma } from "../../lib/prisma";

type Response = { code: number; message: string };

const INVALID = { code: 400, message: "Invalid Request" };
const TEAM_ERROR = { code: 400, message: "Invalid Request: Team Error" };
const INNING_ERROR = { code: 400, message: "Invalid Request: Inning Error" };
const BATTER_ERROR = { code: 400, message: "Invalid Request: Batter Error" };
const PITCHER_ERROR = { code: 400, message: "Invalid Request: Pitcher Error" };
const PITCH_ERROR = { code: 400, message: "Invalid Request: Pitch Error" };
const OUT_ERROR = { code: 400, message: "Invalid Request: Out Error" };
const BASERUNNER_ERROR = { code: 400, message: "Invalid Request: Base Runner Error" };
const POSITION_ERROR = { code: 400, message: "Invalid Request: Hit Position Error" };
const HIT_ERROR = { code: 400, message: "Invalid Request: Hit Position Error" };
const SPEED_ERROR = { code: 400, message: "Invalid Request: Hit Speed Error" };
const BASES_ERROR = { code: 400, message: "Invalid Request: Hit Total Bases Error" };
const SUCCESS = { code: 200, message: "Success" };
const INTERNAL = { code: 500, message: "Internal Server Error" };

const HANDS = {
	Left: "LEFT",
	Right: "RIGHT",
} as const;
const PITCH_TYPES = {
	1: { fastball: true, inzone: true },
	2: { fastball: true, inzone: false },
	3: { fastball: false, inzone: true },
	4: { fastball: false, inzone: false },
} as const;
const PITCH_RESULTS = {
	1: "IN_PLAY",
	2: "BALL",
	3: "CALLED_STRIKE",
	4: "SWINGING_STRIKE",
	5: "FOUL",
	6: "BUNT_STRIKE",
} as const;
const RESULTS = [
	"STRIKE_OUT_SWINGING",
	"STRIKE_OUT_LOOKING",
	"WALK",
	"HIT_BY_PITCH",
	"HIT",
	"OUT",
	"NONE",
] as const;
const HITS = {
	1: "GROUND_BALL",
	2: "LINE_DRIVE",
	3: "FLY_BALL",
	4: "POP_UP",
	5: "BUNT",
} as const;
const POSSIBLE_OUTS = [1, 2, 3] as const;
const POSSIBLE_INNINGS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const POSSIBLE_POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const POSSIBLE_SPEEDS = [1, 2, 3] as const;
const POSSIBLE_BASES = [0, 1, 2, 3, 4] as const;

type Outs = (typeof POSSIBLE_OUTS)[number];
type Bases = (typeof POSSIBLE_BASES)[number];
type Result = (typeof RESULTS)[number];
type Hit = (typeof HITS)[keyof typeof HITS];
type Position = (typeof POSSIBLE_POSITIONS)[number];
type Speed = (typeof POSSIBLE_SPEEDS)[number];
type ABHand = (typeof HANDS)[keyof typeof HANDS];
type PitchResult = (typeof PITCH_RESULTS)[keyof typeof PITCH_RESULTS];

interface AtBat {
	inning: NonNullable<Inning>;
	outs: Outs;
	runners: string;
	bases: Bases;
	result: Result;
	hit?: Hit;
	position?: Position;
	speed?: Speed;
	batterNumber: number;
	pitcher: {
		hand: ABHand;
		name: string;
		number: number;
		ranking: Ranking;
	};
	pitches: {
		fastball: boolean;
		inzone: boolean;
		number: number;
		result: PitchResult;
	}[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	function loadJSON(req: NextApiRequest) {
		try {
			const data = JSON.parse(req.body);
			return data;
		} catch (e) {
			return respond(INVALID);
		}
	}

	function respond(result: Response): void {
		return res.status(result.code).json({ code: result.code, message: result.message });
	}

	function defined(...values: any[]): boolean {
		return !values.some((e) => e === undefined);
	}

	if (!req.body) {
		return respond(INVALID);
	}

	const data = loadJSON(req);
	const inputs: Input[] = data.inputs;
	const pitchers: Pitcher[] = data.pitchers;
	const gameInfo: GameInfoInput = data.gameInfo;
	const innings: Inning[] = data.innings;

	if (!inputs || !pitchers || !gameInfo || !innings) {
		return respond(INVALID);
	}

	try {
		let transactions: PrismaPromise<any>[] = [];

		let inputsFinished = false;
		let currentInning = innings[0];
		let currentOuts = 0;
		let batterNumber = inputs[0].batter;
		let pitcherNumber = inputs[0].pitcher;

		if (currentInning !== 1) return respond(INNING_ERROR);
		if (batterNumber === undefined) return respond(BATTER_ERROR);
		if (pitcherNumber === undefined) return respond(PITCHER_ERROR);
		if (gameInfo.school === "" || gameInfo.team === "" || gameInfo.date === "") {
			return respond(TEAM_ERROR);
		}

		const team = await prisma.team.upsert({
			where: {
				name: gameInfo.team,
			},
			update: {},
			create: {
				name: gameInfo.team,
				school: gameInfo.school,
			},
		});
		const game = await prisma.game.upsert({
			where: {
				id: team.id,
			},
			update: {},
			create: {
				date: gameInfo.date,
				opponentId: team.id,
			},
		});

		for (let input of inputs) {
			let position: Position, hit: Hit, speed: Speed, bases: Bases;

			let [pos_str, hit_str, speed_str, bases_str] = [...input.result];

			// if (POSSIBLE_POSITIONS.includes(parseInt(pos_str))) {
			// }

			let atbat: AtBat = {
				bases: 1,
				inning: currentInning,
				outs: 1,
				runners: "123",
				hit: "FLY_BALL",
				result: "HIT",
				position: 9,
				speed: 2,
				batterNumber: 9,
				pitcher: {
					hand: "RIGHT",
					name: "Al Heinike",
					number: 18,
					ranking: 3,
				},
				pitches: [{ fastball: true, inzone: true, number: 1, result: "IN_PLAY" }],
			};

			await prisma.atbat.create({
				data: {
					bases: atbat.bases,
					inning: atbat.inning,
					outs: atbat.outs,
					result: atbat.result,
					runners: atbat.runners,
					hit: atbat.hit,
					position: atbat.position,
					speed: atbat.speed,
					batter: {
						connect: {
							number: atbat.batterNumber,
						},
					},
					pitcher: {
						connectOrCreate: {
							where: {
								teamId_number: {
									teamId: team.id,
									number: atbat.pitcher.number,
								},
							},
							create: {
								hand: atbat.pitcher.hand,
								name: atbat.pitcher.name,
								number: atbat.pitcher.number,
								ranking: atbat.pitcher.ranking,
								teamId: team.id,
							},
						},
					},
					pitches: {
						createMany: {
							data: atbat.pitches,
						},
					},
					game: {
						connect: {
							id: game.id,
						},
					},
				},
			});
		}
	} catch (e) {
		return respond(INTERNAL);
	}

	return respond(SUCCESS);
}
