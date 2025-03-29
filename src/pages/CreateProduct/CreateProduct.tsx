import { Button, Card, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import {useUploadHandlers} from "../../features/createProduct/hooks/hooks.ts";

const { Item } = Form;

export default function CreateProduct() {
    const {imageUrl, onFinish, handleBeforeUpload} = useUploadHandlers()
    const [form] = Form.useForm();

    return (
        <div style={{ padding: '24px' }}>
            <Card title="Создать новый продукт">
                <Form
                    form={form}
                    onFinish={(values) => onFinish(values)}
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
                            beforeUpload={(file) => handleBeforeUpload(file)}
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