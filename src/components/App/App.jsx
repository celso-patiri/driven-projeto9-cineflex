import { useContext, useEffect, useState } from 'react';
import { IoMdArrowBack as Return } from 'react-icons/io';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { OrderProvider } from '../../context/OrderContext';
import ThemeContext from '../../context/ThemeContext';
import Movies from '../Movies/Movies';
import Seats from '../Seats/Seats';
import Sessions from '../Sessions/Sessions';
import Success from '../Success/Success';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './App.scss';

function App() {
	const { dark } = useContext(ThemeContext);
	const [homeUrl, sethomeUrl] = useState(null);

	useEffect(() => {
		sethomeUrl(window.location.href);
	}, []);

	return (
		<div className={`App ${dark ? 'theme-dark' : 'theme-light'}`}>
			<Header />
			<OrderProvider>
				<Routes>
					<Route path="/" element={<Movies />} />
					<Route path="/sessoes/:idFilme" element={<Sessions />} />
					<Route path="/assentos/:idSessao" element={<Seats />} />
					<Route path="/sucesso" element={<Success />} />
				</Routes>
			</OrderProvider>
		</div>
	);

	function Header() {
		const navigate = useNavigate();
		return (
			<header>
				<ReturnButton navigate={navigate} />
				<h1 onClick={() => navigate('/')}>CINEFLEX</h1>
				<ThemeSwitch />
			</header>
		);
	}

	function ReturnButton({ navigate }) {
		if (window.location.href === homeUrl) return '';
		return <Return className="Return" onClick={() => navigate(-1)} />;
	}
}

export default App;
