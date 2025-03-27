import React, { useState } from 'react';
import { Button, Card, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPhoto } from '@/app/store/reducers/photosSlice';
import TextArea from 'antd/es/input/TextArea';

const { Item } = Form;

export default function CreateProduct() {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBeforeUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const onFinish = (values) => {
        if (!imageUrl) {
            message.error('Пожалуйста, загрузите изображение');
            return;
        }

        const newProduct = {
            alt_description: values.title,
            description: values.description,
            urls: {
                small: imageUrl,
                regular: imageUrl
            },
            user: {
                name: values.author || 'Пользователь'
            }
        };

        dispatch(addNewPhoto(newProduct));
        message.success('Карточка успешно создана!');
        navigate('/');
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Создать новый продукт">
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Item
                        label="Название продукта"
                        name="title"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите название!' },
                            { min: 3, message: 'Название должно содержать минимум 3 символа' }
                        ]}
                    >
                        <Input placeholder="Введите название продукта" />
                    </Item>

                    <Item
                        label="Описание"
                        name="description"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите описание!' },
                            { min: 10, message: 'Описание должно содержать минимум 10 символов' }
                        ]}
                    >
                        <TextArea rows={4} placeholder="Введите описание продукта" />
                    </Item>

                    <Item
                        label="Автор"
                        name="author"
                        rules={[
                            { required: true, message: 'Пожалуйста, укажите автора!' }
                        ]}
                    >
                        <Input placeholder="Введите имя автора" />
                    </Item>

                    <Item
                        label="Изображение продукта"
                        required
                    >
                        <Upload
                            accept="image/*"
                            beforeUpload={handleBeforeUpload}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Выбрать изображение</Button>
                        </Upload>
                        {imageUrl && (
                            <div style={{ marginTop: 16 }}>
                                <img
                                    src={imageUrl}
                                    alt="Превью"
                                    style={{ maxWidth: '100%', maxHeight: 200 }}
                                />
                            </div>
                        )}
                    </Item>

                    <Item style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">
                            Создать продукт
                        </Button>
                    </Item>
                </Form>
            </Card>
        </div>
    );
}