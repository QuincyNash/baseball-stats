import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Pitcher } from "../pages";

interface PitcherInputProps {
	pitcher: Pitcher;
	index: number;
	onNameChange: (name?: string) => void;
	onNumberChange: (number?: number) => void;
	onHandChange: (hand?: "Left" | "Right") => void;
	onRankingChange: (ranking?: 1 | 2 | 3 | 4 | 5 | 6) => void;
}

export default function PitcherInput(props: PitcherInputProps) {
	return (
		<div className="flex gap-1">
			<TextField
				label="Pitcher Name"
				value={props.pitcher.name ?? ""}
				style={{ width: 180 }}
				inputProps={{ maxLength: 32 }}
				onChange={(event) => props.onNameChange(event.target.value)}
			/>
			<TextField
				label="#"
				value={props.pitcher.number ?? ""}
				style={{ width: 60 }}
				inputProps={{ maxLength: 2 }}
				onChange={(event) => {
					let value = event.target.value;
					value = value.replace(/[^\d]/gm, "");
					console.log(value === "" ? null : parseInt(value));
					props.onNumberChange(value === "" ? undefined : parseInt(value));
				}}
			/>
			<FormControl sx={{ minWidth: 100 }}>
				<InputLabel>Hand</InputLabel>
				<Select
					value={props.pitcher.hand ?? ""}
					label="Hand"
					onChange={(event) => props.onHandChange(event.target.value as any)}
				>
					<MenuItem value={"Right"}>Right</MenuItem>
					<MenuItem value={"Left"}>Left</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ minWidth: 120 }}>
				<InputLabel>Ranking</InputLabel>
				<Select
					value={props.pitcher.ranking ?? ""}
					label="Ranking"
					onChange={(event) => props.onRankingChange(event.target.value as any)}
				>
					<MenuItem value={1}>1 (65-)</MenuItem>
					<MenuItem value={2}>2 (65-70)</MenuItem>
					<MenuItem value={3}>3 (70-75)</MenuItem>
					<MenuItem value={4}>4 (75-80)</MenuItem>
					<MenuItem value={5}>5 (80-85)</MenuItem>
					<MenuItem value={6}>6 (85+)</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
