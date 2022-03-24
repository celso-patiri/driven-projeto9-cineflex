import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import { OrderProvider } from './context/OrderContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import './styles/index.scss';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<OrderProvider>
					<App />
				</OrderProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
