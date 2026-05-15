const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			const screens = theme("screens");

			addComponents({
				".my-container": {
					maxWidth: "1600px",
					marginLeft: "auto",
					marginRight: "auto",
					paddingLeft: "1rem",
					paddingRight: "1rem",
					backgroundColor: "pink", // ví dụ bạn muốn như này

					[`@media (min-width: ${screens.sm})`]: {
						maxWidth: screens.sm,
					},
					[`@media (min-width: ${screens.md})`]: {
						maxWidth: screens.md,
					},
					[`@media (min-width: ${screens.lg})`]: {
						maxWidth: screens.lg,
					},
					[`@media (min-width: ${screens.xl})`]: {
						maxWidth: screens.xl,
					},
					[`@media (min-width: ${screens["2xl"]})`]: {
						maxWidth: screens["2xl"],
					},
				},
			});
		}),

		require("@tailwindcss/line-clamp"),
	],
};
