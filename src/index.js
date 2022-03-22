import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';

import './styles/index.scss';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.js';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
