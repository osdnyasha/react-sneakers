import React from 'react'
import {AppContext} from "../App";

export const useCart = () => {
    const { cartCards, setCartCards } = React.useContext(AppContext);
    const totalPrice  = cartCards.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    return {cartCards, setCartCards,totalPrice};
}