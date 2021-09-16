import React from 'react';
import axios from 'axios';

import Card from '../components/Card';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    'https://60e35ddc6c365a0017839288.mockapi.io/orders'
                );
                setOrders(
                    data.reduce((prev, obj) => [...prev, ...obj.items], [])
                );
                setIsLoading(false);
            } catch (error) {
                throw Error('Ошибка при запросе заказов');
            }
        })();
    }, []);

    return (
        <div className="content">
            <div className="content__header">
                <h1 className="content__title">Мои Заказы</h1>
            </div>
            <div className="content-cards">
                {(isLoading ? [...Array(7)] : orders).map(
                    (card, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...card}
                        />
                    )
                )}
            </div>
        </div>
    );
}
export default Orders;
