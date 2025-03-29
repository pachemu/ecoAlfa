import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../StoreProvider.ts';
import {UnsplashPhoto} from "../../../shared/product/types/types.ts";

interface PhotosState {
    rawPhotos: UnsplashPhoto[];
    likedIds: string[];
    deletedIds: string[];
}

const loadPersistedState = () => {
    try {
        const rawPhotos = JSON.parse(localStorage.getItem('rawPhotos') || '[]');
        const likedIds = JSON.parse(localStorage.getItem('likedIds') || '[]');
        const deletedIds = JSON.parse(localStorage.getItem('deletedIds') || '[]');

        return {
            rawPhotos: Array.isArray(rawPhotos) ? rawPhotos : [],
            likedIds: Array.isArray(likedIds) ? likedIds : [],
            deletedIds: Array.isArray(deletedIds) ? deletedIds : []
        };
    } catch (e) {
        console.error('Ошибка загрузки из localStorage', e);
        return {
            rawPhotos: [],
            likedIds: [],
            deletedIds: []
        };
    }
};
const saveFullState = (state: PhotosState) => {
    try {
        localStorage.setItem('rawPhotos', JSON.stringify(state.rawPhotos));
        localStorage.setItem('likedIds', JSON.stringify(state.likedIds));
        localStorage.setItem('deletedIds', JSON.stringify(state.deletedIds));
    } catch (e) {
        console.error('Ошибка сохранения в localStorage', e);
    }
};
const initialState: PhotosState = loadPersistedState();

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setRawPhotos: (state, action: PayloadAction<UnsplashPhoto[]>) => {
            const newPhotos = action.payload.filter(apiPhoto =>
                !state.rawPhotos.some(photo => photo.id === apiPhoto.id)
            );
            state.rawPhotos = [...state.rawPhotos, ...newPhotos];
            saveFullState(state);
        },
        updatePhoto: (state, action: PayloadAction<UnsplashPhoto>) => {
            const index = state.rawPhotos.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.rawPhotos[index] = action.payload;
                saveFullState(state);
            }
        },
        addNewPhoto: (state, action: PayloadAction<Omit<UnsplashPhoto, 'id'>>) => {
            const newPhoto = {
                ...action.payload,
                id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Уникальный ID
                urls: {
                    small: action.payload.urls.small,
                    regular: action.payload.urls.small
                },
                isCustom: true
            };

            state.rawPhotos.unshift(newPhoto);
            try {
                localStorage.setItem('rawPhotos', JSON.stringify(state.rawPhotos));
            } catch (e) {
                console.error('Ошибка сохранения новой карточки', e);
            }
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = state.likedIds.indexOf(id);
            if (index === -1) {
                state.likedIds.push(id);
            } else {
                state.likedIds.splice(index, 1);
            }
            localStorage.setItem('likedIds', JSON.stringify(state.likedIds));
        },
        deletePhoto: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.deletedIds.includes(id)) {
                state.deletedIds.push(id);
                localStorage.setItem('deletedIds', JSON.stringify(state.deletedIds));
            }
            const likeIndex = state.likedIds.indexOf(id);
            if (likeIndex !== -1) {
                state.likedIds.splice(likeIndex, 1);
                localStorage.setItem('likedIds', JSON.stringify(state.likedIds));
            }
        },
    }
});

export const selectVisiblePhotos = createSelector(
    [(state: RootState) => state.photos.rawPhotos,
        (state: RootState) => state.photos.deletedIds],
    (raw, deleted) => raw.filter(photo => !deleted.includes(photo.id))
);

export const { setRawPhotos, toggleLike, deletePhoto, addNewPhoto, updatePhoto } = photosSlice.actions;
export default photosSlice.reducer;