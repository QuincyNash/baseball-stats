import { FormEventHandler } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { default as dayjs } from "dayjs";
import PitcherInput from "../components/pitcher_input";
import { GameInfo, Pitcher } from "../pages";

interface GameDetailsProps {
	maxPitchers: number;
	gameInfo: GameInfo;
	setInfo: (property: string, value: any) => void;
	pitchers: Pitcher[];
	setPitcher: (index: number, property: string, value: any) => void;
	onSubmit: FormEventHandler;
}

export default function GameDetails(props: GameDetailsProps) {
	return (
		<div className="flex flex-col gap-3 ml-8">
			<div className="flex gap-1 mb-2">
				{
					<TextField
						label="School Name"
						value={props.gameInfo.school}
						style={{ width: 145 }}
						inputProps={{ maxLength: 32 }}
						onChange={(event) => props.setInfo("school", event.target.value)}
					></TextField>
				}
				{
					<TextField
						label="Team Name"
						value={props.gameInfo.team}
						style={{ width: 145 }}
						inputProps={{ maxLength: 32 }}
						onChange={(event) => props.setInfo("team", event.target.value)}
					></TextField>
				}
				{
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Date"
							minDate={dayjs("2023-01-01")}
							maxDate={dayjs("2030-01-01")}
							value={props.gameInfo.date ?? null}
							sx={{ width: 175 }}
							onChange={(newValue: dayjs.Dayjs | null) => {
								props.setInfo("date", newValue);
							}}
						></DatePicker>
					</LocalizationProvider>
				}
			</div>
			{Array.from({ length: props.maxPitchers }).map((_, i) => (
				<PitcherInput
					key={i}
					index={i + 1}
					pitcher={props.pitchers[i]}
					onNameChange={(name) => props.setPitcher(i, "name", name)}
					onNumberChange={(number) => props.setPitcher(i, "number", number)}
					onHandChange={(hand) => props.setPitcher(i, "hand", hand)}
					onRankingChange={(ranking) => props.setPitcher(i, "ranking", ranking)}
				></PitcherInput>
			))}
			<Button
				type="submit"
				variant="outlined"
				size="large"
				style={{ width: 120 }}
				onSubmit={props.onSubmit}
			>
				Submit
			</Button>
		</div>
	);
}
