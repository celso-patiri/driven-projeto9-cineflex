import { createContext, useState } from 'react';

const ThemeContext = createContext({ dark: false, toggle: () => true });

export function ThemeProvider({ children }) {
	const [dark, setDark] = useState(false);

	function toggleTheme() {
		setDark(!dark);
	}

	return (
		<ThemeContext.Provider value={{ dark: dark, toggle: toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContext;
