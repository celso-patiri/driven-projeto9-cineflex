import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import Session from '../Session/Session';
import Success from '../Success/Success';

import './App.scss';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/filme" element={<Movie />} />
				<Route path="/sessao" element={<Session />} />
				<Route path="/sucesso" element={<Success />} />
			</Routes>
		</div>
	);
}

export default App;
