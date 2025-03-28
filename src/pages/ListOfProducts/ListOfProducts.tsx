import { List, Button } from 'antd';
import styles from './ListOfProducts.module.scss';
import {useProductList} from "../../features/listOfProducts/hooks/useProductList.ts";
import {SearchFilter} from "../../widgets/listOfProducts/searchFilter/ui/SearchFilter.tsx";
import {ProductCard} from "../../widgets/listOfProducts/product-card/ui/productCard.tsx";

const ListOfProducts = () => {
    const {
        isLoading,
        isError,
        filteredPhotos,
        searchText,
        filter,
        setSearchText,
        setFilter,
        handleDelete,
        handleLike,
        likedIds,
        navigate,
    } = useProductList();

    if (isError) return <div className={styles.error}>Ошибка загрузки данных</div>;

    return (
        <div className={styles.container}>
            <SearchFilter
                searchText={searchText}
                filter={filter}
                onSearchChange={setSearchText}
                onFilterChange={setFilter}
            />

            <List
                pagination={{
                    pageSize: 12,
                    pageSizeOptions: ['12'],
                    position: 'top',
                    align: 'center'
                }}
                loading={isLoading}
                grid={{ gutter: 16, column: 6 }}
                dataSource={filteredPhotos}
                className={styles.list}
                renderItem={(item) => (
                    <ProductCard
                        item={item}
                        isLiked={likedIds.includes(item.id)}
                        onLike={(e) => handleLike(item.id, e)}
                        onDelete={(e) => handleDelete(item.id, e)}
                        onClick={() => navigate(`/product/${item.id}`)}
                    />
                )}
            />

            <Button
                type="primary"
                onClick={() => navigate('/create-product')}
                className={styles.button_createTest}
            >
                Создать новую карточку
            </Button>
        </div>
    );
};
export default ListOfProducts