import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import Session from '../Session/Session';
import Success from '../Success/Success';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './App.scss';

function App() {
	const { dark } = useContext(ThemeContext);

	return (
		<div className={`App ${dark ? 'theme-dark' : 'theme-light'}`}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/filme/:id" element={<Movie />} />
				<Route path="/sessao" element={<Session />} />
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
