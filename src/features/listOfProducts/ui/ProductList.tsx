import { List, Button } from 'antd';
import styles from './ProductList.module.scss';
import {SearchFilter} from "@/widgets/listOfProducts/searchFilter/ui/SearchFilter.tsx";
import {ProductCard} from "@/widgets/listOfProducts/product-card/ui/productCard.tsx";
import {handleCardClick} from "../../product/model/hooks/handlers.ts";
import {useProductList} from "../hooks/useProductList.ts";

export const ProductList = () => {
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

    if (isError) return <div>Error</div>;
    
    return (
        <div className={styles.container}>
            <SearchFilter
                searchText={searchText}
                filter={filter}
                onSearchChange={setSearchText}
                onFilterChange={setFilter}
            />

            <List
                pagination={{ pageSize: 12, position: 'top', align: 'center' }}
                loading={isLoading}
                grid={{ gutter: 16, column: 6 }}
                dataSource={filteredPhotos}
                renderItem={(item) => (
                    <ProductCard
                        item={item}
                        isLiked={likedIds.includes(item.id)}
                        onLike={(e) => handleLike(item.id, e)}
                        onDelete={(e) => handleDelete(item.id, e)}
                        onClick={() => handleCardClick(item.id, navigate)}
                    />
                )}
            />

            <Button
                onClick={() => navigate('/create-product')}
                className={styles.createButton}
            >
                Создать карточку
            </Button>
        </div>
    );
};