import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.scss';

export const BackButton = ({ onClick }: { onClick?: () => void }) => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={onClick || (() => navigate(-1))}
            className={styles.button_back}
        >
            Назад
        </Button>
    );
};