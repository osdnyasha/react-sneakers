import Info from '../components/Info';
import React from 'react';
import { useCart } from '../hooks/useCart';
import axios from 'axios';

function Cart({ items = [], onClickOverlay, removeItem }) {
    const { cartCards,setCartCards,totalPrice} = useCart();
    const [isOrdered, setIsOrdered] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    const orderFn = async () => {
        try {
            const { data } = await axios.post(
                'https://60e35ddc6c365a0017839288.mockapi.io/orders',
                {
                    items: cartCards,
                }
            );
            cartCards.forEach((item, index) => {
                axios.delete(
                    `https://60e35ddc6c365a0017839288.mockapi.io/cart/${
                        index + 1
                    }`
                );
            });
            setOrderId(data.id);
            setCartCards([]);
            setIsOrdered(true);
        } catch (error) {
            throw new Error('Не удалось создать заказ');
        }
    };

    return (
        <div className="overlay">
            <div className="cart">
                <h2 className="cart__title">Корзина</h2>
                <img
                    className="cart__close"
                    onClick={onClickOverlay}
                    width={20}
                    height={20}
                    src="/img/icons/remove.svg"
                    alt=""
                ></img>

                {items.length > 0 && !isOrdered ? (
                    <div className="cart__wrap">
                        <div className="cart__items">
                            {items.map((item) => (
                                <div key={item.id} className="cart__item">
                                    <div className="cart__img">
                                        <img
                                            alt="card img"
                                            width={85}
                                            height={70}
                                            src={item.imageSrc}
                                        />
                                    </div>
                                    <div className="cart__info">
                                        <div className="cart__name">
                                            {item.name}
                                        </div>
                                        <span className="cart__price text--bold card__price-value">
                                            {item.price} руб.
                                        </span>
                                    </div>
                                    <div className="cart__remove"  onClick={() => removeItem(item)}>
                                        <img
                                            alt="card img"
                                            width={16}
                                            height={16}
                                            src="/img/icons/remove.svg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card__info">
                            <div className="card__total">
                                <p>
                                    Итого:{' '}
                                    <span className="text--bold">
                                        {totalPrice} руб.
                                    </span>
                                </p>
                            </div>
                            <div className="card__nalog">
                                <p>
                                    Налог 5%:{' '}
                                    <span className="text--bold">
                                        {totalPrice ? Math.round(totalPrice * 0.05) : '0'} руб.
                                    </span>
                                </p>
                            </div>
                            <div
                                className="card__btn"
                                onClick={() => orderFn()}
                            >
                                Оформить заказ
                            </div>
                        </div>
                    </div>
                ) : isOrdered ? (
                    <Info
                        title={'Заказ оформлен!'}
                        description={`Ваш заказ #${orderId} скоро будет передан курьерской доставке`}
                        img={'/img/cart-ordered.svg'}
                    />
                ) : (
                    <Info
                        title={'Корзина пустая'}
                        description={
                            'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        img={'/img/cart-empty.png'}
                    />
                )}
            </div>
        </div>
    );
}
export default Cart;
