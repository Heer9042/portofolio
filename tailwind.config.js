/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				'display': 'clamp(1.625rem, 4vw + 0.75rem, 3rem)',
				'heading-lg': 'clamp(1.75rem, 3.5vw + 0.75rem, 2.5rem)',
				'heading': 'clamp(1.375rem, 2.5vw + 0.75rem, 2.25rem)',
				'body-lg': 'clamp(0.9375rem, 1vw + 0.75rem, 1.125rem)',
				'body': 'clamp(0.875rem, 0.5vw + 0.75rem, 1rem)',
			},
			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem',
			},
			screens: {
				'xs': '320px',
				'3xl': '1920px',
				'4xl': '2560px',
			},
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
