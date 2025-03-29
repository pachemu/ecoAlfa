import { Select, Input } from 'antd';
import styles from './SearchFilter.module.scss';
type ProductListFilter = 'all' | 'liked';
export const SearchFilter = ({
                                 searchText,
                                 filter,
                                 onSearchChange,
                                 onFilterChange,
                             }: {
    searchText: string;
    filter: ProductListFilter;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: ProductListFilter) => void;
}) => (
    <div className={styles.controls}>
        <Input.Search
            placeholder="Поиск..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.search}
        />
        <Select
            value={filter}
            onChange={onFilterChange}
            className={styles.select}
        >
            <Select.Option value="all">Все</Select.Option>
            <Select.Option value="liked">Избранные</Select.Option>
        </Select>
    </div>
);