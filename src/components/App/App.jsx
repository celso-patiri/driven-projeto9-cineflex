import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Movies from '../Movies/Movies';
import Seats from '../Seats/Seats';
import Sessions from '../Sessions/Sessions';
import Success from '../Success/Success';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './App.scss';

function App() {
	const { dark } = useContext(ThemeContext);

	return (
		<div className={`App ${dark ? 'theme-dark' : 'theme-light'}`}>
			<Header />
			<Routes>
				<Route path="/" element={<Movies />} />
				<Route path="/sessoes/:idFilme" element={<Sessions />} />
				<Route path="/assentos/:idSessao" element={<Seats />} />
				<Route path="/sucesso" element={<Success />} />
			</Routes>
		</div>
	);

	function Header() {
		return (
			<header>
				<h1>CINEFLEX</h1>
				<ThemeSwitch />
			</header>
		);
	}
}

export default App;
