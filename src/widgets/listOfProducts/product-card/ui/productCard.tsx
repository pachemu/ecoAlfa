import { Card } from 'antd';
import styles from './ProductCard.module.scss';
import {UnsplashPhoto} from "@/shared/product/types/types.ts";
import {DeleteButton} from "../../../buttons/DeleteButton.tsx";
import {LikeButton} from "../../../buttons/LikeButton.tsx";

export const ProductCard = ({
                                item,
                                onLike,
                                onDelete,
                                onClick,
                                isLiked,
                            }: {
    item: UnsplashPhoto;
    onLike: (e) => void;
    onDelete: (e) => void;
    onClick: (e) => void;
    isLiked: boolean;
}) => (
    <Card
        onClick={onClick}
        hoverable
        className={styles.card}
        title={item.alt_description}
        cover={<img className={styles.image} alt={item.description} src={item.urls.small} />}
        actions={[
            <LikeButton isLiked={isLiked} onLike={onLike}/>,
            <DeleteButton onDelete={onDelete} />,
        ]}
    />
);