import { useState } from "react";
import { message } from "antd";
import { addNewPhoto } from "@/app/store/reducers/photosSlice.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useUploadHandlers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    const handleBeforeUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const onFinish = (values: {
        title: string;
        description: string;
        author?: string;
    }) => {
        if (!imageUrl) {
            message.error("Пожалуйста, загрузите изображение");
            return;
        }

        const newProduct = {
            id: Date.now().toString(),
            alt_description: values.title,
            description: values.description,
            urls: {
                small: imageUrl,
                regular: imageUrl,
            },
            user: {
                name: values.author || "Пользователь",
            },
        };

        dispatch(addNewPhoto(newProduct));
        message.success("Карточка успешно создана!");
        navigate("/");
    };

    return { handleBeforeUpload, onFinish, imageUrl };
};