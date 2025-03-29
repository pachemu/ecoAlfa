import styles from './Product.module.scss'

export const ProductImagePreview = ({
                                        imageUrl,
                                        alt
                                    }: {
    imageUrl: string;
    alt?: string;
}) => (
    <span>
        {imageUrl && (
            <img
                className={styles.main_card_preview_photo}
                alt={alt || ''}
                src={imageUrl}
            />
        )}
    </span>
);