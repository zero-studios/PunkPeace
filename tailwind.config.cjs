module.exports = {
	content: [
		"./src/**/*.svelte",
		"./prismic/slices/**/*.svelte"
	],
	theme: {
		screens: {
			"xxs": "360px",
			"xs": "480px",
			"sm": "640px",
			"md": "768px",
			"dk": "769px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1440px",
			"3xl": "1680px",
			"4xl": "1920px"
		},
		letterSpacing: {
			"tighter": "-2px",
			"tight": "-1px",
			"normal": "0",
			"wide": "1px",
			"wider": "2px"
		},
		extend: {
			colors: {
				"primary-color": "var(--theme-primary-background)",
				"primary-text": "var(--theme-primary-text)",
				"primary-accent": "var(--theme-primary-accent)",
				"secondary-color": "var(--theme-secondary-background)",
				"secondary-text": "var(--theme-secondary-text)",
				"secondary-accent": "var(--theme-secondary-accent)"
			},
			fontFamily: {
				"body": [
					"Helvetica",
					"Helvetica Neue",
					"Arial",
					"sans-serif"
				],
				"display": [
					"Helvetica",
					"Helvetica Neue",
					"Arial",
					"sans-serif"
				]
			},
			fontSize: {
				x50: "50%",
				x60: "60%",
				x70: "70%",
				x80: "80%",
				x90: "90%",
				x100: "100%",
				x110: "110%",
				x120: "120%",
				x130: "130%",
				x140: "140%",
				x150: "150%"
			},
			lineHeight: {
				x50: "50%",
				x60: "60%",
				x70: "70%",
				x80: "80%",
				x90: "90%",
				x100: "100%",
				x110: "110%",
				x120: "120%",
				x130: "130%",
				x140: "140%",
				x150: "150%"
			},
			spacing: {
				"xxs": "0.8rem",
				"xs": "1rem",
				"sm": "2rem",
				"md": "2rem",
				"dk": "4rem",
				"lg": "4rem",
				"xl": "4rem",
				"2xl": "4rem",
				"3xl": "8rem",
				"4xl": "8rem"
			},
			width: {
				x10: "10%",
				x20: "20%",
				x30: "30%",
				x40: "40%",
				x50: "50%",
				x60: "60%",
				x70: "70%",
				x80: "80%",
				x90: "90%",
				x100: "100%"
			},
		},
	}
}