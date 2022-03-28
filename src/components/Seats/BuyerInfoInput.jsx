export default function BuyerInfoInput({ id, orderInfo, setOrderInfo }) {
	const buyer = orderInfo.find((order) => order.seatId === id);

	if (!buyer) return '';
	return (
		<div className="BuyerInfo-wrapper">
			<h3>Assento {buyer.seatNumber}</h3>
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
					type="number"
					onChange={handleInputChange}
					placeholder="Digite seu CPF..."
					name="cpf"
					required
				></input>
			</label>
		</div>
	);

	function handleInputChange(event) {
		const nameOrCpfInput = event.target;

		buyer[nameOrCpfInput.name] = nameOrCpfInput.value;
		setOrderInfo([...orderInfo]);
	}
}
