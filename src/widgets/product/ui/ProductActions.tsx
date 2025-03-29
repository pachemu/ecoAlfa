import { Button } from 'antd';
import { HeartFilled, HeartOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Product.module.scss'
export const ProductActions = ({
                                   isEditing,
                                   isLiked,
                                   onLike,
                                   onEdit,
                                   onSave,
                                   onCancel,
                               }: {
    isEditing: boolean;
    isLiked: boolean;
    onLike: () => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}) => (
    <div className={styles.actions}>
        <Button
            className={styles.button_like}
            type="text"
            icon={isLiked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
            onClick={onLike}
        />
        {!isEditing ? (
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={onEdit}
            className={styles.button_edit}
            />
        ) : (
            <>
                <Button
                    type="text"
                    icon={<SaveOutlined />}
                    onClick={onSave}
                className={styles.button_save}
                />
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onCancel}
                    className={styles.button_cancel}
                />
            </>
        )}
    </div>
);