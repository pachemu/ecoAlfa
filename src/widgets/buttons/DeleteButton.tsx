import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "../product/ui/Product.module.scss";

interface DeleteButtonProps {
    onDelete: React.MouseEventHandler<HTMLElement>;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => (
    <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={onDelete}
        className={styles.button_like}
    />
);