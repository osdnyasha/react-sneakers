import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
    const [cards, setCards] = React.useState([]);
    const [cartCards, setCartCards] = React.useState([]);
    const [cartActive, setCartActive] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [favorites, setFavorites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [cartItemsResponse, favoritesResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(
                            'https://60e35ddc6c365a0017839288.mockapi.io/cart'
                        ),
                        axios.get(
                            'https://60e35ddc6c365a0017839288.mockapi.io/favorite'
                        ),
                        axios.get(
                            'https://60e35ddc6c365a0017839288.mockapi.io/items'
                        ),
                    ]);

                setIsLoading(false);

                setCartCards(cartItemsResponse.data);
                setFavorites(favoritesResponse.data);
                setCards(itemsResponse.data);
            } catch (error) {
                console.warn('Ошибка при получении данных');
            }
        }

        fetchData();
    }, []);

    const addCart = (obj) => {
        try {
            const duplicate = cartCards.find(
                (item) => Number(item.id) === Number(obj.id)
            );
            if (duplicate && duplicate.itemId !== undefined) {
                axios.delete(
                    `https://60e35ddc6c365a0017839288.mockapi.io/cart/${duplicate.itemId}`
                );
                setCartCards((prev) =>
                    prev.filter((item) => Number(item.id !== Number(obj.id)))
                );
            } else {
                axios.post(
                    'https://60e35ddc6c365a0017839288.mockapi.io/cart',
                    obj
                );
                setCartCards((prev) => [...prev, obj]);
            }
        } catch (error) {
            console.warn('removing items error');
        }
    };

    const removeItem = (obj) => {
        try {
            const { itemId } = cartCards.find(
                (item) => Number(item.id) === Number(obj.id)
            );
            axios.delete(
                `https://60e35ddc6c365a0017839288.mockapi.io/cart/${itemId}`
            );
            setCartCards((prev) => prev.filter((item) => item.id !== obj.id));
        } catch (error) {
            console.warn('removing items error');
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const addFavorite = async (obj) => {
        try {
            if (favorites.find((item) => item.id === obj.id)) {
                axios.delete(
                    `https://60e35ddc6c365a0017839288.mockapi.io/favorite/${obj.id}`
                );
            } else {
                const { data } = await axios.post(
                    'https://60e35ddc6c365a0017839288.mockapi.io/favorite',
                    obj
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            console.warn('adding/removing favorites');
        }
    };

    const isItemAdded = (id) => {
        return cartCards.some((item) => Number(item.id) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                cards,
                cartCards,
                setCartCards,
                favorites,
                isItemAdded,
                setCartActive,
            }}
        >
            <div className="wrapper">
                {cartActive && (
                    <Cart
                        items={cartCards}
                        onClickOverlay={() => setCartActive(false)}
                        removeItem={removeItem}
                    />
                )}
                <Header onClickCart={() => setCartActive(true)} />
                <Route path="/" exact>
                    <Home
                        cards={cards}
                        cartCards={cartCards}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        addCart={addCart}
                        favorites={favorites}
                        addFavorite={addFavorite}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path="/favorites" exact>
                    <Favorites addCart={addCart} addFavorite={addFavorite} />
                </Route>

                <Route path="/orders" exact>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
