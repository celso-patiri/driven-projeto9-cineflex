import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../../context/OrderContext';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many';

export default function FinishOrder({ reservedSeats, sessionInfo }) {
	const [buyersInfo, setBuyersInfo] = useState([]);
	const { setOrder } = useContext(OrderContext);
	const navigate = useNavigate();

	useEffect(() => {
		setBuyersInfo(
			reservedSeats.map((seat) => {
				const buyer = buyersInfo.find((buyerIt) => buyerIt.seatId === seat.id);
				const cpf = buyer ? buyer.cpf : '';
				const name = buyer ? buyer.name : '';
				return { seatId: seat.id, cpf: cpf, name: name };
			})
		);
	}, [reservedSeats]);

	if (reservedSeats.length === 0) return '';

	return (
		<form className="finish-order" onSubmit={handleSubmit}>
			{reservedSeats.map((seat) => (
				<BuyerInfoInput
					id={seat.id}
					buyers={buyersInfo}
					setBuyers={setBuyersInfo}
					key={seat.id}
				/>
			))}
			<input value="Reservar assento(s)" className="submit-form" type="submit" />
		</form>
	);

	function handleSubmit(event) {
		event.preventDefault();

		const reservedSeatsInfo = reservedSeats.map((seatInfo, index) => {
			return {
				// ...seatInfo,
				idAssento: seatInfo.id,
				name: buyersInfo[index].name,
				cpf: buyersInfo[index].cpf,
			};
		});

		setOrder({
			...sessionInfo,
			seats: reservedSeatsInfo,
		});

		axios
			.post(URL, {
				ids: reservedSeatsInfo.map((seat) => seat.id),
				compradores: reservedSeatsInfo,
				// compradores: reservedSeatsInfo.map((seat) => {
				// 	return {
				// 		idAssento: seat.id,
				// 		nome: seat.name,
				// 		cpf: seat.cpf,
				// 	};
				// }),
			})
			.then(navigate('/sucesso'))
			.catch((err) => console.error(err));
	}
}

function BuyerInfoInput({ id, buyers, setBuyers }) {
	function handleInputChange(event) {
		const nameOrCpf = event.target;

		buyers.find((buyer) => buyer.seatId === id)[nameOrCpf.name] = nameOrCpf.value;
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
