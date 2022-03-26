import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../../context/OrderContext';

const URL = 'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many';

export default function FinishOrderForm({ reservedSeats, sessionInfo }) {
	const [orderInfo, setOrderInfo] = useState([]);
	const { setOrder } = useContext(OrderContext);
	const navigate = useNavigate();

	useEffect(() => {
		setOrderInfo(
			reservedSeats.map((seat) => {
				const buyer = orderInfo.find((order) => order.seatId === seat.id);
				return {
					name: buyer ? buyer.name : '',
					cpf: buyer ? buyer.cpf : '',
					seatId: seat.id,
					seatNumber: seat.number,
				};
			})
		);
	}, [reservedSeats]);

	if (reservedSeats.length === 0) return '';

	return (
		<form className="finish-order" onSubmit={handleSubmit}>
			{reservedSeats.map((seat) => (
				<BuyerInfoInput
					id={seat.id}
					orderInfo={orderInfo}
					setOrderInfo={setOrderInfo}
					key={seat.id}
				/>
			))}
			<input value="Reservar assento(s)" className="submit-form" type="submit" />
		</form>
	);

	function handleSubmit(event) {
		event.preventDefault();

		setOrder({
			...sessionInfo,
			seats: orderInfo,
		});

		axios
			.post(URL, {
				ids: orderInfo.map((seat) => seat.seatId),
				compradores: orderInfo.map((buyer) => {
					return {
						nome: buyer.name,
						cpf: buyer.cpf,
						idAssento: buyer.seatId,
					};
				}),
			})
			.then(navigate('/sucesso'))
			.catch((err) => console.error(err));
	}
}

function BuyerInfoInput({ id, orderInfo, setOrderInfo }) {
	function handleInputChange(event) {
		const nameOrCpfInput = event.target;

		orderInfo.find((buyer) => buyer.seatId === id)[nameOrCpfInput.name] = nameOrCpfInput.value;
		setOrderInfo([...orderInfo]);
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
