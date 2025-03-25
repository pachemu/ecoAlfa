import { useGetPhotosQuery } from "@/app/api/productsApi.ts";
import { Button, Card, List, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
    toggleLike,
    deletePhoto,
    selectVisiblePhotos
} from "@/app/store/reducers/photosSlice.ts";
import { RootState } from "@/app/store/StoreProvider.ts";
import Title from "antd/lib/typography/Title";
import { UnsplashPhoto } from "@/app/api/productsApi.ts";
import styles from './ListOfProducts.module.scss'

export default function ListOfProducts() {
    const { data: apiPhotos, isLoading, isError } = useGetPhotosQuery({ page: 1, perPage: 10 }, {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
        refetchOnFocus: false
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const visiblePhotos = useSelector(selectVisiblePhotos);
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);
    const [showLikedOnly, setShowLikedOnly] = useState(false);
    console.log(visiblePhotos, apiPhotos)
    const handleCardClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    const handleLike = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleLike(id));
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deletePhoto(id));
    };

    if (isError) return <div>Error</div>;

    const photosToShow = showLikedOnly
        ? visiblePhotos.filter(photo => likedIds.includes(photo.id))
        : visiblePhotos;

    return (
        <div>
            <Title>Список продуктов</Title>

            <div style={{ marginBottom: 16 }}>
                <Switch
                    checkedChildren="Показать избранные"
                    unCheckedChildren="Все фото"
                    onChange={setShowLikedOnly}
                />
            </div>

            <List
                grid={{ gutter: 16, column: 6 }}
                loading={isLoading}
                pagination={{ position: "top", align: "center" }}
                dataSource={photosToShow}
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