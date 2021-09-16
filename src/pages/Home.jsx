import Card from '../components/Card';

function Home({
    cards,
    cartCards,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    addCart,
    addFavorite,
    isLoading,
}) {
    const renderItems = () => {
        const filteredCards = cards.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading ? [...Array(7)] : filteredCards).map(
            (card, index) => (
                <Card
                    key={index}
                    addCartFn={addCart}
                    addFavorite={addFavorite}
                    loading={isLoading}
                    {...card}
                />
            )
        );
    };

    return (
        <div className="content">
            <div className="content__header">
                <h1 className="content__title">
                    {searchValue
                        ? `Поиск по запросу "${searchValue}"`
                        : 'Все кроссовки'}
                </h1>
                <div className="search-box">
                    <img
                        className="search__img"
                        width={14.24}
                        height={14.25}
                        src="/img/icons/search.svg"
                        alt=""
                    ></img>
                    {searchValue && (
                        <img
                            className="search__clear"
                            onClick={() => setSearchValue('')}
                            width={14.24}
                            height={14.25}
                            src="/img/icons/remove.svg"
                            alt=""
                        ></img>
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        className="search__input"
                        type="text"
                        placeholder="Поиск"
                    ></input>
                </div>
            </div>
            <div className="content-cards">{renderItems()}</div>
        </div>
    );
}
export default Home;
