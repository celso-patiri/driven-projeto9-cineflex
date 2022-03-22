import axios from 'axios';
import { useEffect, useState } from 'react';

import './Home.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex';

export default function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(`${URL}/movies`).then((res) => {
			setMovies(res.data);
		});
	}, []);

	return (
		<div className="Home">
			<h1>Selecione o filme</h1>
			<div className="movies">
				{movies.map((movie) => (
					<img src={movie.posterURL} alt="poster" className="movie" />
				))}
			</div>
		</div>
	);
}
