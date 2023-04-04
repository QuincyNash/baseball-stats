interface PitchProps {
	value: string;
	removeRegex: RegExp;
	placeholder?: string;
	className?: string;
	maxLength?: number;
	onChange: (value: string) => void;
}

export default function NumberInput(props: PitchProps) {
	return (
		<div className={`bg-white text-lg ${props.className}`}>
			<input
				className="placeholder:text-gray-300 focus:border focus:border-red-500 block w-full h-full text-center outline-none"
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
