import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Footer from '../Footer/Footer';
import FinishOrder from './FinishOrder';
import SeatButton from './SeatButton';
import './Seats.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/showtimes';

export default function Seats() {
	const [sessionInfo, setSessionInfo] = useState(null);
	const [reservedSeats, setReservedSeats] = useState([]);
	const { dark } = useContext(ThemeContext);

	const { idSessao } = useParams();

	useEffect(() => {
		axios
			.get(`${URL}/${idSessao}/seats`)
			.then((res) => setSessionInfo(res.data))
			.catch((err) => console.error(err));
	}, []);
	console.log(sessionInfo);
	if (!sessionInfo) return 'Loading...';
	return (
		<div className={`Seats ${dark ? 'theme-dark' : 'theme-light'}`}>
			<h1 className="title">Selecione os assentos</h1>
			<div className="seats-grid">
				{sessionInfo.seats.map((seat) => (
					<SeatButton
						number={seat.name}
						available={seat.isAvailable}
						reserveSeat={reserveSeat}
						id={seat.id}
						key={seat.id}
					/>
				))}
			</div>
			<ButtonExamples />
			<FinishOrder reservedSeats={reservedSeats} sessionInfo={sessionInfo} />
			<Footer
				posterURL={sessionInfo.movie.posterURL}
				title={sessionInfo.movie.title}
				session={`${sessionInfo.day.weekday} - ${sessionInfo.name}`}
			/>
		</div>
	);

	function reserveSeat(id, number) {
		if (reservedSeats.some((seat) => seat.id === id))
			setReservedSeats(reservedSeats.filter((seat) => seat.id !== id));
		else setReservedSeats([...reservedSeats, { id: id, number: number }]);
	}
}

function ButtonExamples() {
	return (
		<div className="button-examples">
			<div>
				<button className="selected" />
				<h4>Selecionado</h4>
			</div>
			<div>
				<button className="available" />
				<h4>Disponivel</h4>
			</div>
			<div>
				<button className="unavailable" />
				<h4>Indisponível</h4>
			</div>
		</div>
	);
}
