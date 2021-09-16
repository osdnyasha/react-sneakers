import React from 'react';
import ContentLoader from 'react-content-loader';
import {AppContext} from '../App';

function Card({
    name,
    price,
    imageSrc,
    id,
    addFavorite,
    addCartFn,
    favorited = false,
    loading = false,
}) {
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const { isItemAdded } = React.useContext(AppContext);
    const itemObj = { name, price, imageSrc, id, itemId : id };

    const clickPlusHandler = () => {
        addCartFn(itemObj);
    };

    const clickAddFavorites = () => {
        addFavorite(itemObj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card">
            {loading ? (
                <ContentLoader
                    speed={1}
                    width={150}
                    height={210}
                    viewBox="0 0 150 210"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="132" rx="5" ry="5" width="130" height="15" />
                    <rect x="0" y="180" rx="5" ry="5" width="80" height="25" />
                    <rect
                        x="118"
                        y="175"
                        rx="10"
                        ry="10"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    {addFavorite && <div
                        className={
                            'btn card__btn card__btn--bookmark ' +
                            (isFavorite ? 'active' : '')
                        }
                        onClick={clickAddFavorites}
                    ></div>}
                    <img
                        className="card__img"
                        width={133}
                        height={112}
                        src={imageSrc}
                        alt="card"
                    />
                    <div className="card__title">{name}</div>
                    <div className="card__price">
                        <div className="text--small text--gray text--uppercase">
                            Цена:
                        </div>
                        <span className="text--bold card__price-value">
                            {price} руб.
                        </span>
                    </div>
                    {addCartFn && <div
                        className={
                            'btn card__btn card__btn--add ' +
                            (isItemAdded(id) ? 'active' : '')
                        }
                        onClick={clickPlusHandler}
                    ></div>}
                </>
            )}
        </div>
    );
}

export default Card;
