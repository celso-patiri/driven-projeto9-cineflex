import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FinishOrder from './FinishOrder';
import SeatButton from './SeatButton';
import './Seats.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/showtimes';

export default function Seats() {
	const [sessionInfo, setSessionInfo] = useState(null);
	const [reservedSeats, setReservedSeats] = useState([]);

	const { idSessao } = useParams();

	useEffect(() => {
		axios
			.get(`${URL}/${idSessao}/seats`)
			.then((res) => setSessionInfo(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="Seats">
			{sessionInfo ? (
				<>
					<h1>Selecione os assentos</h1>
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
				</>
			) : (
				'Loading...'
			)}
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
