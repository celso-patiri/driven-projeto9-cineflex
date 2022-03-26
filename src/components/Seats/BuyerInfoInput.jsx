export default function BuyerInfoInput({ id, orderInfo, setOrderInfo }) {
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

	function handleInputChange(event) {
		const nameOrCpfInput = event.target;
		const buyer = orderInfo.find((order) => order.seatId === id);

		buyer[nameOrCpfInput.name] = nameOrCpfInput.value;
		setOrderInfo([...orderInfo]);
	}
}
