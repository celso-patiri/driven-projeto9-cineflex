import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Session from './components/Session/Session';
import Success from './components/Success/Success';

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
