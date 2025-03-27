import { useState, useEffect } from 'react';
import { Button, Card, Spin, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { HeartFilled, HeartOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, updatePhoto } from '@/app/store/reducers/photosSlice';
import { RootState } from '@/app/store/StoreProvider';
import styles from './Product.module.scss';
import Meta from 'antd/es/card/Meta';
import TextArea from 'antd/es/input/TextArea';

export default function Product() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const photo = useSelector((state: RootState) =>
        state.photos.rawPhotos.find(photo => photo.id === id));
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);

    useEffect(() => {
        if (!photo) {
            navigate('/not-found', { replace: true });
        } else {
            setImageUrl(photo.urls.regular || photo.urls.small);
        }
    }, [photo, navigate]);

    const handleLike = () => id && dispatch(toggleLike(id));

    const handleEdit = () => {
        form.setFieldsValue({
            title: photo?.alt_description,
            description: photo?.description,
            author: photo?.user?.name
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                if (photo && id) {
                    const updatedPhoto = {
                        ...photo,
                        alt_description: values.title,
                        description: values.description,
                        user: {
                            ...photo.user,
                            name: values.author || 'Неизвестный автор'
                        },
                        urls: {
                            ...photo.urls,
                            small: imageUrl,
                            regular: imageUrl
                        }
                    };

                    dispatch(updatePhoto(updatedPhoto));
                    message.success('Изменения сохранены!');
                    setIsEditing(false);
                }
            })
            .catch(() => message.error('Проверьте введенные данные'));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setImageUrl(photo?.urls.regular || photo?.urls.small || '');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImageUrl(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    if (!photo) return <Spin size="large" className={styles.spin} />;

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
                        src={imageUrl}
                    />
                </Card.Grid>

                <div className={styles.main_card_description}>
                    {isEditing ? (
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="title"
                                label="Название"
                                rules={[{required: true, message: 'Введите название'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Описание"
                            >
                                <TextArea rows={4}/>
                            </Form.Item>
                            <Form.Item
                                name="author"
                                label="Автор"
                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    ) : (
                        <>
                            <Meta
                                className={styles.main_card_title}
                                title={photo.alt_description}
                                description={photo.description ? photo.description : 'Описание не указано'}
                            />
                            <span className={styles.main_card_author}>
                                {photo.user?.name ? `Создано: ${photo.user?.name}` : 'Автор не указан'}
                            </span>
                        </>
                    )}
                </div>
                <div className={styles.actions}>
                    <Button
                        className={styles.button_like}
                        type="text"
                        icon={likedIds.includes(photo.id)
                            ? <HeartFilled style={{color: "red"}}/>
                            : <HeartOutlined/>}
                        onClick={handleLike}
                    />
                    {!isEditing ? (
                        <Button
                            className={styles.button_edit}
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={handleEdit}
                        />
                    ) : (
                        <>
                            <Button
                                className={styles.button_save}
                                type="text"
                                icon={<SaveOutlined/>}
                                onClick={handleSave}
                            />
                            <Button
                                className={styles.button_cancel}
                                type="text"
                                icon={<CloseOutlined/>}
                                onClick={handleCancel}
                            />
                        </>
                    )}
                </div>
                {isEditing && (
                    <div className={styles.image_upload}>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{display: 'none'}}
                        />
                        <label htmlFor="image-upload" className={styles.upload_label}>
                            Изменить фото
                        </label>
                    </div>
                )}
            </Card>
        </div>
    );
}