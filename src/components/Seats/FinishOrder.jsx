import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../../context/OrderContext';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many';

export default function FinishOrder({ reservedSeats, sessionInfo }) {
	const [buyers, setBuyers] = useState([]);
	const { setOrder } = useContext(OrderContext);
	const navigate = useNavigate();

	useEffect(() => {
		setBuyers(
			reservedSeats.map((seat) => {
				const buyer = buyers.find((it) => it.seatId === seat.id);
				const cpf = buyer ? buyer.cpf : '';

				const name = buyer ? buyer.name : '';
				return { seatId: seat.id, cpf: cpf, name: name };
			})
		);
	}, [reservedSeats, buyers]);

	if (reservedSeats.length === 0) return '';

	return (
		<form className="finish-order" onSubmit={handleSubmit}>
			{reservedSeats.map((seat) => (
				<OrderInfoInput id={seat.id} buyers={buyers} setBuyers={setBuyers} key={seat.id} />
			))}
			<input className="submit-form" type="submit" value="Reservar assento(s)" />
		</form>
	);

	function handleSubmit(event) {
		event.preventDefault();

		const reservedSeatsInfo = reservedSeats.map((seat, index) => {
			return {
				...seat,
				name: buyers[index].name,
				cpf: buyers[index].cpf,
			};
		});

		setOrder({
			...sessionInfo,
			seats: reservedSeatsInfo,
		});

		axios
			.post(URL, {
				ids: reservedSeatsInfo.map((seat) => seat.id),
				compradores: reservedSeatsInfo.map((seat) => {
					return {
						idAssento: seat.id,
						nome: seat.name,
						cpf: seat.cpf,
					};
				}),
			})
			.then(navigate('/sucesso'))
			.catch((err) => console.error(err));
	}
}

function OrderInfoInput({ id, buyers, setBuyers }) {
	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;

		buyers.find((buyer) => buyer.seatId === id)[target.name] = value;
		setBuyers([...buyers]);
	}

	return (
		<label>
			<p>Nome do comprador</p>
			<input
				type="text"
				onChange={handleInputChange}
				placeholder="Digite seu nome..."
				name="name"
				required
			></input>
			<p>CPF do comprador</p>
			<input
				type="text"
				onChange={handleInputChange}
				placeholder="Digite seu CPF..."
				name="cpf"
				required
			></input>
		</label>
	);
}
