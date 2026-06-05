/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				cyber: {
					DEFAULT: '#00ff9d',
					primary: '#00ff9d',
					secondary: '#00b8ff',
					text: '#e6edf3',
				},
				clean: {
					bg: '#f8fafc',
					card: '#ffffff',
					text: '#0f172a',
					primary: '#00a67e',
				},
			},
			backdropBlur: {
				sm: '4px',
			},
			boxShadow: {
				'neon-sm': '0 6px 20px rgba(0,255,157,0.06), 0 2px 8px rgba(0,184,255,0.04)',
			},
		},
	},
	plugins: [],
}
