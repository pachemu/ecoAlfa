import { useGetPhotosQuery } from "@/app/api/productsApi.ts";
import { Button, Card, List, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { addPhotos, toggleLike } from "@/app/store/reducers/photosSlice.ts";
import { RootState } from "@/app/store/StoreProvider.ts";
import Title from "antd/lib/typography/Title";
import { selectSortedPhotos } from "@/app/store/reducers/photosSlice.ts";
import { UnsplashPhoto } from "@/app/api/productsApi.ts";
import {deletePhoto, selectLikedPhotos} from "@/app/store/reducers/photosSlice.ts";

export default function ListOfProducts() {
    const { data: apiPhotos, isLoading, isError } = useGetPhotosQuery({ page: 1, perPage: 10 });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allPhotos = useSelector((state: RootState) => state.photos.photos);
    const likedPhotos = useSelector(selectLikedPhotos);
    const sortedPhotos = useSelector(selectSortedPhotos);

    const [showLikedOnly, setShowLikedOnly] = useState(false);

    const photosToShow = showLikedOnly ? sortedPhotos : allPhotos;

    useEffect(() => {
        if (apiPhotos) {
            dispatch(addPhotos(apiPhotos));
        }
    }, [apiPhotos, dispatch]);

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
    }
    if (isError) return <div>Error</div>;

    return (
        <div>
            <Title>Список продуктов</Title>

            <div style={{ marginBottom: 16 }}>
                <Switch
                    checkedChildren="Показать избранные"
                    unCheckedChildren="Все фото"
                    onChange={(checked) => setShowLikedOnly(checked)}
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
                                        likedPhotos[item.id]
                                            ? <HeartFilled style={{ color: "red" }} />
                                            : <HeartOutlined />
                                    }
                                    onClick={(e) => handleLike(item.id, e)}
                                />,
                                <Button
                                type="text"
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
        </div>
    );
}