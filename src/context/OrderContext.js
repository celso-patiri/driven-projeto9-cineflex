import { createContext, useState } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
	const [order, setOrder] = useState(null);

	return (
		<OrderContext.Provider value={{ order: order, setOrder: setOrder }}>
			{children}
		</OrderContext.Provider>
	);
}

export default OrderContext;
