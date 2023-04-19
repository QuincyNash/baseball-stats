interface PitchProps {
	value: string;
	removeRegex: RegExp;
	placeholder?: string;
	className?: string;
	maxLength?: number;
	fontSize?: "small" | "large";
	border?: "gray" | "none";
	onChange: (value: string) => void;
}

export default function NumberInput(props: PitchProps) {
	return (
		<div
			className={`bg-white ${props.fontSize === "large" ? "text-xl" : "text-lg"} ${
				props.border === "gray" ? "border-gray-200" : "border-transparent"
			} ${props.className}`}
		>
			<input
				className={`placeholder:text-gray-300 focus:border-blue-500 border-inherit block w-full h-full text-center transition-colors border outline-none ${
					props.border === "gray" ? "rounded-md" : "rounded-sm"
				}`}
				maxLength={props.maxLength === undefined ? 2 : props.maxLength}
				value={props.value}
				placeholder={props.placeholder}
				onChange={(event) => {
					const result = event.target.value.replace(props.removeRegex, "");
					if (result !== props.value) {
						props.onChange(result);
					}
				}}
			></input>
		</div>
	);
}
