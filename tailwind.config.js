/** @type {import('tailwindcss').Config} */
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
				4: "repeat(4, 1fr)",
				9: "repeat(9, 1fr)",
			},
			fontSize: {
				xl: [
					"calc(var(--scale) * 16px)",
					{
						lineHeight: "calc(var(--scale) * 16px)",
					},
				],
				lg: [
					"calc(var(--scale) * 12px)",
					{
						lineHeight: "calc(var(--scale) * 12px)",
					},
				],
			},
			borderWidth: {
				DEFAULT: "1px",
				2: "2px",
				3: "3px",
				4: "4px",
				6: "6px",
				8: "8px",
			},
			gap: {
				sm: "1px",
				lg: "2px",
			},
			spacing: {
				1: "calc(var(--scale) * 5px)",
				2: "calc(var(--scale) * 10px)",
				3: "calc(var(--scale) * 15px)",
				4: "calc(var(--scale) * 20px)",
				5: "calc(var(--scale) * 25px)",
				8: "calc(var(--scale) * 40px)",
				10: "calc(var(--scale) * 50px)",
				12: "calc(var(--scale) * 60px)",
				sm: "calc(var(--scale) * 25px - 1px)",
				md: "calc(var(--scale) * 40px + 2px)",
			},
		},
	},
	plugins: [],
};
