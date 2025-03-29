import Meta from "antd/es/card/Meta";
import styles from './Product.module.scss'
type ProductMetaProps = {
    title?: string;
    description?: string;
    author?: string;
};

export const ProductMeta = ({ title, description, author }: ProductMetaProps) => (
    <>
        <Meta
            className={styles.main_card_title}
            title={title}
            description={description || 'Описание не указано'}
        />
        <span className={styles.main_card_author}>
      {author ? `Создано: ${author}` : 'Автор не указан'}
    </span>
    </>
);