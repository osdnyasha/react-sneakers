import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="header">
            <Link to={process.env.PUBLIC_URL + '/'}>
                <div className="header__info">
                    <div alt="logo" className="header__logo"></div>
                    <div className="header__title">
                        <h3 className="text--large text--bold">
                            REACT SNEAKERS
                        </h3>
                        <p className="text--small text--gray header__subtitle">
                            Магазин лучших кроссовок
                        </p>
                    </div>
                </div>
            </Link>

            <div className="header__cart">
                <ul className="header__controls cart-controls">
                    <li
                        className="cart-controls__list"
                        onClick={props.onClickCart}
                    >
                        <div
                            className="cart-controls__img cart-controls__img-cart"
                            alt="cart logo"
                        ></div>
                        <span className="cart-controls__price">
                            {totalPrice} руб
                        </span>
                    </li>
                    <li className="cart-controls__list">
                        <Link to={process.env.PUBLIC_URL + '/favorites'}>
                            <div
                                className="cart-controls__img cart-controls__img-bookmark"
                                alt="bookmark logo"
                            ></div>
                        </Link>
                    </li>
                    <li className="cart-controls__list">
                        <Link to={process.env.PUBLIC_URL + '/orders'}>
                            <div
                                className="cart-controls__img cart-controls__img-user"
                                alt="user logo"
                            ></div>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
