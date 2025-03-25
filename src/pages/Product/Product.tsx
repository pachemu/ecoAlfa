import {Button, Card, Spin} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {toggleLike} from "@/app/store/reducers/photosSlice.ts";
import {RootState} from "@/app/store/StoreProvider.ts";
import styles from './Product.module.scss'
import Meta from "antd/es/card/Meta";

export default function Product() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const photo = useSelector((state: RootState) =>
        state.photos.rawPhotos.find(photo => photo.id === id));
    console.log(photo)
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);

    const handleLike = () => id && dispatch(toggleLike(id));

    if (!photo) return <Spin size="large"/>;

    return (
        <div className={styles.main}>
            <Button onClick={() => navigate(-1)} className={styles.button_back}>
                Назад
            </Button>

            <Card className={styles.main_card}>
                <Card.Grid className={styles.main_card_preview}>
                    <img
                        className={styles.main_card_preview_photo}
                        alt={photo.description || ''}
                        src={photo.urls.regular || photo.urls.small}
                    />
                    <Button
                        className={styles.button_like}
                        type="text"
                        icon={likedIds.includes(photo.id)
                            ? <HeartFilled style={{color: "red"}}/>
                            : <HeartOutlined/>}
                        onClick={handleLike}
                    />
                </Card.Grid>
                <div className={styles.main_card_description}>
                    <Meta
                        className={styles.main_card_title}
                        title={photo.alt_description}
                        description={photo.description ? photo.description : 'Описание не указано'}
                    />
                    <span
                        className={styles.main_card_author}>
                        {photo.user?.name ? `Создано : ${photo.user?.name}` : 'Автор не указан'}
                    </span>
                </div>
            </Card>
        </div>
    );
}