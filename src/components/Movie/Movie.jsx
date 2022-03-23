import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import './Movie.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex';

export default function Movie() {
	const { id } = useParams();
	const { dark } = useContext(ThemeContext);

	const [movieInfo, setMovieInfo] = useState({ days: [] });

	useEffect(() => {
		axios
			.get(`${URL}/movies/${id}/showtimes`)
			.then((res) => {
				console.log(res.data);
				setMovieInfo(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<main className={`sessions ${dark ? 'theme-dark' : 'theme-light'}`}>
			<h1>Selecione o horário</h1>
			{movieInfo.days.map((day) => (
				<article key={day.id}>
					<h3>{`${day.weekday} - ${day.date}`}</h3>
					<div className="session-buttons">
						{day.showtimes.map((session) => (
							<button id={session.id}>{session.name}</button>
						))}
					</div>
				</article>
			))}
			<footer>
				<img src={movieInfo.posterURL} />
				<h3>{movieInfo.title}</h3>
			</footer>
		</main>
	);
}
