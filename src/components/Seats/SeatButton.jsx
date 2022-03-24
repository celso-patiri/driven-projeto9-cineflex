import { useState } from 'react';

export default function SeatButton({ number, available, reserveSeat, id }) {
	const [selected, setSelected] = useState(false);

	if (!available) return <button className="unavailable">{number}</button>;
	return (
		<button
			className={selected ? 'selected' : 'available'}
			onClick={() => {
				setSelected(!selected);
				reserveSeat(id, number);
			}}
		>
			{number}
		</button>
	);
}
