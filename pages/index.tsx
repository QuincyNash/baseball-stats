import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { default as dayjs } from "dayjs";
import NumberInput from "../components/number_input";
import Checkbox from "../components/checkbox";
import GameDetails from "../components/game_details";

export interface Input {
	pitches: (number | null)[];
	pitcher?: number;
	batter?: number;
	result?: number;
	outs?: number;
	runners: boolean[];
	[key: string]: any;
}

export interface Pitcher {
	name?: string;
	number?: number;
	hand?: "Left" | "Right";
	ranking?: 1 | 2 | 3 | 4 | 5 | 6;
	[key: string]: any;
}

export interface GameInfo {
	school?: string;
	team?: string;
	date?: dayjs.Dayjs;
	[key: string]: any;
}

export default function Home() {
	const maxPitchers = 5;

	const [inputs, setInputs] = useState<Input[]>(
		Array.from({ length: 72 }).map(() => ({
			pitches: new Array(16).fill(null),
			runners: [false, false, false],
		}))
	);
	const [pitchers, setPitchers] = useState<Pitcher[]>(
		Array.from({ length: maxPitchers }).map(() => ({}))
	);
	const [gameInfo, setGameInfo] = useState<GameInfo>({});
	const [innings, setInnings] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);

	function setInput(index: number, property: string, value: any, propIndex?: number) {
		let newInputs = structuredClone(inputs);
		if (propIndex !== undefined) {
			newInputs[index][property][propIndex] = value;
		} else {
			newInputs[index][property] = value;
		}
		setInputs(newInputs);
	}

	function setPitcher(index: number, property: string, value: any) {
		let newPitchers = structuredClone(pitchers);
		newPitchers[index][property] = value;
		setPitchers(newPitchers);
	}

	function setInfo(property: string, value: any) {
		let newGameInfo = structuredClone(gameInfo);
		newGameInfo[property] = value;
		setGameInfo(newGameInfo);
	}

	function setInning(index: number, value: string) {
		let newInnings = structuredClone(innings);
		newInnings[index] = value;
		setInnings(newInnings);
	}

	function formatNumber(value: number | undefined | null) {
		if (value === null || value === undefined) {
			return "";
		} else {
			return value.toString();
		}
	}

	async function onSubmit(event: FormEvent) {
		event.preventDefault();

		const response = await fetch("api/submit", {
			method: "POST",
			body: JSON.stringify({ inputs, pitchers, gameInfo, innings }),
		});
		const data = await response.json();
		console.log(data);
	}

	return (
		<>
			<Head>
				<title>Baseball Stats</title>
				<meta name="description" content="Baseball Stats" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex items-center justify-center w-full h-full overflow-auto">
				<form className="w-fit h-fit m-auto" onSubmit={onSubmit}>
					<div className="flex flex-row items-center justify-center">
						<div className="flex flex-col justify-center">
							<div className="flex items-center justify-around mb-1">
								{innings.map((inning, i) => (
									<NumberInput
										key={i}
										removeRegex={/[^1-9]/gm}
										maxLength={1}
										fontSize="large"
										border="gray"
										className="w-5 h-5"
										value={inning}
										onChange={(value) => setInning(i, value)}
									></NumberInput>
								))}
							</div>
							<div className="grid-rows-9 gap-lg grid grid-flow-col grid-cols-8 bg-black border-2 border-black">
								{inputs.map((input, i) => (
									<div key={i} className="bg-white">
										<div className="bg-black">
											<div
												className="h-md gap-sm grid grid-cols-4 grid-rows-4 overflow-auto border-b border-black"
												style={{ colorScheme: "light" }}
											>
												{input.pitches.map((pitch, i2) => (
													<NumberInput
														key={i2}
														removeRegex={/[^1-6]/gm}
														value={formatNumber(pitch)}
														className="shrink-0 w-5 h-4"
														onChange={(value) => {
															setInput(i, "pitches", value, i2);
														}}
													></NumberInput>
												))}
											</div>
										</div>
										<div className="gap-sm flex flex-row bg-black">
											<div className="w-12 h-8 bg-white">
												<div className="w-fit gap-sm grid grid-cols-2 bg-black border-b border-r border-black">
													<NumberInput
														removeRegex={/[^\d]/gm}
														value={formatNumber(input.pitcher)}
														placeholder="P#"
														className="w-5 h-3"
														onChange={(value) => {
															setInput(i, "pitcher", value);
														}}
													></NumberInput>
													<NumberInput
														removeRegex={/[^\d]/gm}
														value={formatNumber(input.batter)}
														placeholder="B#"
														className="w-5 h-3"
														onChange={(value) => {
															setInput(i, "batter", value);
														}}
													></NumberInput>
												</div>
												<NumberInput
													removeRegex={/[^\d]/gm}
													value={formatNumber(input.result)}
													maxLength={4}
													className="h-sm text-xl"
													onChange={(value) => {
														setInput(i, "result", value);
													}}
												></NumberInput>
											</div>
											<div className="w-md relative flex items-center justify-center bg-white">
												<div className="flex items-center justify-center w-8 h-8 rotate-45">
													<div className="grid-cols-auto2 grid content-between justify-between w-5 h-5 border border-black">
														{["border-b border-r", "border-b border-l", "border-t border-r"].map(
															(borders, index) => {
																index = [1, 0, 2][index]; // Fix order of bases
																return (
																	<Checkbox
																		key={index}
																		className={borders}
																		checked={input.runners[index]}
																		onClick={() => {
																			setInput(i, "runners", !input.runners[index], index);
																		}}
																	></Checkbox>
																);
															}
														)}
													</div>
												</div>
												<NumberInput
													removeRegex={/[^123]/gm}
													value={formatNumber(input.outs)}
													maxLength={1}
													className="absolute w-3 h-3"
													onChange={(value) => {
														setInput(i, "outs", value);
													}}
												></NumberInput>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<GameDetails
							maxPitchers={maxPitchers}
							gameInfo={gameInfo}
							setInfo={setInfo}
							pitchers={pitchers}
							setPitcher={setPitcher}
							onSubmit={onSubmit}
						></GameDetails>
					</div>
				</form>
			</main>
		</>
	);
}
