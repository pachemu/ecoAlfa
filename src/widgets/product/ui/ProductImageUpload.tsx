import styles from './Product.module.scss'
import {Button} from "antd";

export const ProductImageUpload = ({onChange}: { onChange: (file: File) => void }) => (
    <div className="image_upload">
        <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
            style={{display: 'none'}}
        />
        <Button
        className={styles.image_upload}>
            <label
                htmlFor="image-upload"
                className={styles.image_upload_text}>
                Изменить фото
            </label>
        </Button>
    </div>
);