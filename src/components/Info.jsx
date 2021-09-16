import React from 'react';
import {AppContext} from "../App";

function Info({title, description, img}) {
    const {setCartActive} = React.useContext(AppContext);
    return (
        <div className="cart--empty">
            <img src={img} alt="cart"></img>
            <h3 className="cart__title">{title}</h3>
            <p className="text--gray text--center">
                {description}
            </p>
            <div onClick={() => setCartActive(false)} className="card__btn">
                Назад
            </div>
        </div>
    );
}

export default Info;
