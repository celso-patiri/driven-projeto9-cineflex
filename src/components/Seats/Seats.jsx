import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Seats.scss';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/showtimes';

export default function Seats() {
	const [seatsInfo, setSeatsInfo] = useState(null);
	const { idSessao } = useParams();

	useEffect(() => {
		axios
			.get(`${URL}/${idSessao}/seats`)
			.then((res) => setSeatsInfo(res.data))
			.catch((err) => console.error(err));
	}, []);

	return <div className="Seats">{seatsInfo ? seatsInfo.name : idSessao}</div>;
}
