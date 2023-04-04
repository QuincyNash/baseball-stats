import Head from "next/head";
import NumberInput from "../components/number_input";
import Checkbox from "../components/checkbox";
import PitcherInput from "../components/pitcher_input";
import { FormEvent, useState } from "react";

export interface Input {
	pitches: (number | null)[];
	pitcher?: number;
	batter?: number;
	result?: number;
	outs?: number;
	runners: boolean[];
	[key: string]: any;
}

export default function Home() {
	const [inputs, setInputs] = useState<Input[]>(
		Array.from({ length: 72 }).map(() => ({
			pitches: new Array(8).fill(null),
			runners: [false, false, false],
		}))
	);

	function setInput(index: number, property: string, value: any, propIndex?: number) {
		let newInputs = structuredClone(inputs);
		if (propIndex !== undefined) {
			newInputs[index][property][propIndex] = value;
		} else {
			newInputs[index][property] = value;
		}
		console.log(newInputs);
		setInputs(newInputs);
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
			body: JSON.stringify({ inputs: inputs }),
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
						<div className="w-fit grid-rows-9 gap-lg grid grid-flow-col grid-cols-8 bg-black border-2 border-black">
							{Array.from({ length: 72 }).map((_, i) => (
								<div key={i} className="bg-white">
									<div className="gap-sm grid grid-cols-4 grid-rows-2 bg-black border-b border-black">
										{Array.from({ length: 8 }).map((_, i2) => (
											<NumberInput
												key={i2}
												removeRegex={/[^1-6]/gm}
												value={formatNumber(inputs[i].pitches[i2])}
												className="w-5 h-4"
												onChange={(value) => {
													setInput(i, "pitches", value, i2);
												}}
											></NumberInput>
										))}
									</div>
									<div className="gap-sm flex flex-row bg-black">
										<div className="w-12 h-8 bg-white">
											<div className="w-fit gap-sm grid grid-cols-2 bg-black border-b border-r border-black">
												<NumberInput
													removeRegex={/[^\d]/gm}
													value={formatNumber(inputs[i].pitcher)}
													placeholder="P#"
													className="w-5 h-3"
													onChange={(value) => {
														setInput(i, "pitcher", value);
													}}
												></NumberInput>
												<NumberInput
													removeRegex={/[^\d]/gm}
													value={formatNumber(inputs[i].batter)}
													placeholder="B#"
													className="w-5 h-3"
													onChange={(value) => {
														setInput(i, "batter", value);
													}}
												></NumberInput>
											</div>
											<NumberInput
												removeRegex={/[^\d]/gm}
												value={formatNumber(inputs[i].result)}
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
																	checked={inputs[i].runners[index]}
																	onClick={() => {
																		setInput(i, "runners", !inputs[i].runners[index], index);
																	}}
																></Checkbox>
															);
														}
													)}
												</div>
											</div>
											<NumberInput
												removeRegex={/[^123]/gm}
												value={formatNumber(inputs[i].outs)}
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
						{/* <div className="ml-5">
							<div>
								<PitcherInput></PitcherInput>
							</div>
							<button
								className="hover:bg-gray-200 block p-1 m-auto transition-colors border border-gray-500 rounded-sm"
								type="submit"
							>
								Submit
							</button>
						</div> */}
					</div>
				</form>
			</main>
		</>
	);
}
