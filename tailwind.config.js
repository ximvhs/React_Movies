/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// fontFamily: {
			//   body: ["DM Sans", "sans-sereif"],
			// },
			colors: {
				primary: "#F62682",
				secondary: "red",
			},
		},
	},
	plugins: [],
};
