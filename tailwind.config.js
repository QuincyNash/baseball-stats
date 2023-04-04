/** @type {import('tailwindcss').Config} */

let scale = 1;
let spacing = {
	1: 5 * scale + "px",
	2: 10 * scale + "px",
	3: 15 * scale + "px",
	4: 20 * scale + "px",
	5: 25 * scale + "px",
	8: 40 * scale + "px",
	10: 50 * scale + "px",
	12: 60 * scale + "px",
	sm: 24 * scale + "px",
	md: 42 * scale + "px",
};
let gap = {
	sm: 1 * scale + "px",
	lg: 2 * scale + "px",
};
let borderWidth = {
	DEFAULT: 1 * scale + "px",
	2: 2 * scale + "px",
	3: 3 * scale + "px",
	4: 4 * scale + "px",
	6: 6 * scale + "px",
	8: 8 * scale + "px",
};
let fontSize = {
	xl: [
		16 * scale + "px",
		{
			lineHeight: 16 * scale + "px",
		},
	],
	lg: [
		12 * scale + "px",
		{
			lineHeight: 12 * scale + "px",
		},
	],
};

console.log(fontSize);

module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				4: "repeat(4, 1fr)",
				8: "repeat(8, 1fr)",
				auto2: "auto, auto",
			},
			gridTemplateRows: {
				2: "repeat(2, 1fr)",
				9: "repeat(9, 1fr)",
			},
			fontSize: fontSize,
			borderWidth: borderWidth,
			gap: gap,
			spacing: spacing,
		},
	},
	plugins: [],
};
