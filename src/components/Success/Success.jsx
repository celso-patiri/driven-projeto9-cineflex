import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../../context/OrderContext';
import './Success.scss';

export default function Success() {
	const { order } = useContext(OrderContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!order) {
			navigate('/');
		}
	}, []);
	console.log(order);
	if (!order) return '';
	return (
		<div className="Success">
			<h1 className="title">Pedido feito com sucesso!</h1>
			<div className="order-info-wrapper">
				<div>
					<div className="order-info">
						<h3>Filme e seção</h3>
						<p>{order.movie.title}</p>
						<p>{order.day.weekday}</p>
						<p>
							{order.day.date} - {order.name}
						</p>
					</div>
					<div className="order-info">
						<h3>Ingressos</h3>
						{order.seats.map((seat, index) => {
							return (
								<div key={seat.toString() + index}>
									<p>Assento {seat.number}</p>
									<p>{seat.name}</p>
									<p>{seat.cpf}</p>
								</div>
							);
						})}
					</div>
				</div>
				<img src={order.movie.posterURL} alt="poster" />
			</div>
			<button onClick={() => navigate('/')}>Voltar para Home</button>
		</div>
	);
}
