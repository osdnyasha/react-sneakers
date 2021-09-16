import React from 'react';
import Card from '../components/Card';
import {AppContext} from '../App';

function Favorites({ addCart, addFavorite }) {
    const {favorites} = React.useContext(AppContext);

    return (
        <div className="content">
            <div className="content__header">
                <h1 className="content__title">Мои закладки</h1>
            </div>
            <div className="content-cards">
                {favorites.map((card,index) => (
                    <Card
                        key={index}
                        id={card.id}
                        name={card.name}
                        price={card.price}
                        imageSrc={card.imageSrc}
                        addCartFn={addCart}
                        addFavorite={addFavorite}
                        favorited={true}
                    />
                ))}
            </div>
        </div>
    );
}
export default Favorites;
