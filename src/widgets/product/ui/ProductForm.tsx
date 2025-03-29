import {Form, Input} from 'antd';
import TextArea from "antd/es/input/TextArea";
import styles from './Product.module.scss'

export const ProductForm = ({form, onSave}: { form: any; onSave: () => void }) => (
    <Form form={form} onFinish={onSave} layout="vertical">
        <Form.Item name="title" label="Название" rules={[{required: true}]} className={styles.main_card_title}>
            <Input/>
        </Form.Item>
        <Form.Item name="description" label="Описание" className={styles.main_card_description}>
            <TextArea rows={2}/>
        </Form.Item>
        <Form.Item name="author" label="Автор" className={styles.main_card_author}>
            <Input/>
        </Form.Item>
    </Form>
);