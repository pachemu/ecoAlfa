import {UnsplashPhoto} from "../../../../shared/product/types/types.ts";
import {useState} from "react";
import {Form} from "antd";
import {handleCancel, handleEdit, handleLike, handleSave} from "./handlers.ts";
import {useDispatch} from "react-redux";

export const useProductHandlers = (id:string, photo?: UnsplashPhoto) => {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(photo?.urls.regular || '');
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleImageChange = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    return {
        isEditing,
        imageUrl,
        form,
        handlers: {
            handleEdit: () => handleEdit(form, photo, setIsEditing),
            handleSave: () => handleSave(form, photo, id, dispatch, setIsEditing, imageUrl),
            handleCancel: () => handleCancel(setIsEditing, setImageUrl, photo),
            handleLike: () => handleLike(id, dispatch),
            handleImageChange,
        }
    };
};