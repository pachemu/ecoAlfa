import { useGetPhotosQuery } from "../../app/api/productsApi.ts";
import { Button, Card, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { addPhotos, toggleLike } from "@/app/store/reducers/photosSlice.ts";
import { RootState } from "@/app/store/StoreProvider.ts";

export default function ListOfProducts() {
    const { data: apiPhotos, isLoading, isError } = useGetPhotosQuery({ page: 1, perPage: 10 });
    const { photos, likedPhotos } = useSelector((state: RootState) => state.photos);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    if (isError) return <div>Error</div>;

    return (
        <div>
            <h1>Список продуктов</h1>
            <List
                grid={{ gutter: 16, column: 6 }}
                loading={isLoading}
                pagination={{ position: "top", align: "center" }}
                dataSource={photos}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            actions={[
                                <Button
                                    style={{
                                        width: 50,
                                        height: 50
                                    }}
                                    type="text"
                                    icon={likedPhotos[item.id] ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
                                    onClick={(e) => handleLike(item.id, e)}
                                />
                            ]}
                            onClick={() => handleCardClick(item.id)}
                            hoverable
                            style={{ minHeight: 300 }}
                            title={item.alt_description}
                            cover={
                                <img
                                    style={{
                                        height: 400,
                                }}
                                    alt={item.description}
                                    src={item.urls.small}
                                />
                            }
                        >
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}