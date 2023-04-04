interface CheckboxProps {
	className?: string;
	checked: boolean;
	onClick: () => void;
}

export default function Checkbox(props: CheckboxProps) {
	return (
		<div className={`w-1 h-1 border-black ${props.checked ? "bg-red-500" : ""} ${props.className}`}>
			<button
				type="button"
				className="block w-1 h-1 scale-[250%]"
				tabIndex={-1}
				onClick={props.onClick}
			></button>
		</div>
	);
}
