import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from "../product/ui/Product.module.scss";

interface LikeButtonProps {
    isLiked: boolean;
    onLike: React.MouseEventHandler<HTMLElement>;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => (
    <Button
        className={styles.button_like}
        type="text"
        icon={isLiked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
        onClick={onLike}
    />
);