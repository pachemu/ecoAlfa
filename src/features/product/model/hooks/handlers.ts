import {FormInstance, message} from "antd";
import {toggleLike, updatePhoto} from "@/app/store/reducers/photosSlice.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {UnsplashPhoto} from '@/shared/product/types/types.ts'
import {SetStateAction} from "react";
import {NavigateFunction} from "react-router-dom";

const handleLike = (
    id: string,
    dispatch: Dispatch,
    e?: React.MouseEvent<HTMLElement>
) => {
    e?.stopPropagation();
    dispatch(toggleLike(id));
};

const handleEdit = (form: FormInstance, photo: UnsplashPhoto, SetState: (value: SetStateAction<boolean>) => void) => {
    form.setFieldsValue({
        title: photo?.alt_description,
        description: photo?.description,
        author: photo?.user?.name
    });
    SetState(true);
};

const handleSave = (form: FormInstance, photo: UnsplashPhoto, id: string, dispatch, setState: (value: SetStateAction<boolean>) => void, imageUrl: string) => {
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
                setState(false);
            }
        })
        .catch(() => message.error('Проверьте введенные данные'));
};

const handleCancel = (
    setIsEditing: (value: SetStateAction<boolean>) => void,
    setImageUrl: (value: SetStateAction<string>) => void,
    photo: UnsplashPhoto
) => {
    setIsEditing(false);
    setImageUrl(photo?.urls.regular || photo?.urls.small || '');
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImageUrl: (value: SetStateAction<string>) => void) => {
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

const handleCardClick = (id: string, navigate: NavigateFunction) => {
    navigate(`/product/${id}`);
};

export {handleCancel, handleEdit, handleLike, handleSave, handleImageChange, handleCardClick}