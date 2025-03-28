import { useGetPhotosQuery } from "@/app/api/productsApi.ts";
import {Button, Card, List, Select} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {
    toggleLike,
    deletePhoto,
    selectVisiblePhotos
} from "@/app/store/reducers/photosSlice.ts";
import { RootState } from "@/app/store/StoreProvider.ts";
import { UnsplashPhoto } from "@/app/api/productsApi.ts";
import styles from './ListOfProducts.module.scss'
import Search from "antd/es/input/Search";
import {setRawPhotos} from "@/app/store/reducers/photosSlice.ts";

export default function ListOfProducts() {
    const { data: apiPhotos, isLoading, isError } = useGetPhotosQuery({ page: 1, perPage: 10 }, {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
        refetchOnFocus: false
    });
    const [initialLoad, setInitialLoad] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const visiblePhotos = useSelector(selectVisiblePhotos);
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const handleCardClick = (id: string) => {
        navigate(`/product/${id}`);
    };
    const handleLike = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleLike(id));
    };
    useEffect(() => {
        if (apiPhotos && !initialLoad) {
            dispatch(setRawPhotos(apiPhotos));
            setInitialLoad(true);
        }
    }, [apiPhotos, dispatch, initialLoad]);
    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deletePhoto(id));
    };

    if (isError) return <div>Error</div>;

    const filteredPhotos = visiblePhotos.filter(photo => {
        const matchesSearch = photo.alt_description?.toLowerCase().includes(searchText.toLowerCase()) ||
            photo.description?.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'liked' && likedIds.includes(photo.id));
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <Search
                    placeholder="Поиск..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    defaultValue="all"
                    onChange={setFilter}
                    style={{ width: 150 }}
                >
                    <Select.Option value="all">Все</Select.Option>
                    <Select.Option value="liked">Избранные</Select.Option>
                </Select>
            </div>

            <List
                pagination={{
                    pageSize: 12,
                    showSizeChanger: true,
                    pageSizeOptions: ['12'],
                    position: "top",
                    align: 'center'
                }}
                loading={isLoading}
                grid={{ gutter: 16, column: 6 }}
                dataSource={filteredPhotos}
                renderItem={(item: UnsplashPhoto) => (
                    <List.Item>
                        <Card
                            actions={[
                                <Button
                                    type="text"
                                    icon={
                                        likedIds.includes(item.id)
                                            ? <HeartFilled style={{ color: "red" }} />
                                            : <HeartOutlined />
                                    }
                                    onClick={(e) => handleLike(item.id, e)}
                                />,
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={(e) => handleDelete(item.id, e)}
                                />
                            ]}
                            onClick={() => handleCardClick(item.id)}
                            hoverable
                            style={{ minHeight: 300 }}
                            title={item.alt_description}
                            cover={
                                <img
                                    style={{ height: 400 }}
                                    alt={item.description}
                                    src={item.urls.small}
                                />
                            }
                        />
                    </List.Item>
                )}
            />
            <Button
                onClick={() => navigate('/create-product')}
                className={styles.button_createTest}>
                Создать карточку
            </Button>
        </div>
    );
}