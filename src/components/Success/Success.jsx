import { useContext } from 'react';
import OrderContext from '../../context/OrderContext';
import './Success.scss';

export default function Success() {
	const { order } = useContext(OrderContext);
	console.log(order);
	return (
		<div className="Success">
			<h1>Pedido feito com sucesso!</h1>
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
				{order.seats.map((seat) => {
					return (
						<>
							<p>Assento {seat.number}</p>
							<p>{seat.name}</p>
							<p>{seat.cpf}</p>
						</>
					);
				})}
			</div>
		</div>
	);
}
