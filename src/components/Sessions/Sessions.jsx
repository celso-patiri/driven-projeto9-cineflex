import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Footer from '../Footer/Footer';
import './Sessions.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex';

export default function Sessions() {
	const { idFilme } = useParams();
	const { dark } = useContext(ThemeContext);

	const [movieInfo, setMovieInfo] = useState({ days: [] });

	useEffect(() => {
		axios
			.get(`${URL}/movies/${idFilme}/showtimes`)
			.then((res) => {
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
							<Link key={session.id} id={session.id} to={`/assentos/${session.id}`}>
								<button>{session.name}</button>
							</Link>
						))}
					</div>
				</article>
			))}

			<Footer posterURL={movieInfo.posterURL} title={movieInfo.title} />
		</main>
	);
}
