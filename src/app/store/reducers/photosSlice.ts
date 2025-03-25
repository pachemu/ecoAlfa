import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { UnsplashPhoto } from '../../api/productsApi.ts';
import { RootState } from '../StoreProvider.ts';

interface PhotosState {
    rawPhotos: UnsplashPhoto[];
    likedIds: string[];
    deletedIds: string[];
}

const loadPersistedState = () => ({
    likedIds: JSON.parse(localStorage.getItem('likedIds') || '[]'),
    deletedIds: JSON.parse(localStorage.getItem('deletedIds') || '[]')
});

const initialState: PhotosState = {
    rawPhotos: [],
    ...loadPersistedState()
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setRawPhotos: (state, action: PayloadAction<UnsplashPhoto[]>) => {
            if (state.rawPhotos.length === 0) {
                state.rawPhotos = action.payload;
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
        addNewPhoto: (state, action: PayloadAction<Omit<UnsplashPhoto, 'id'>>) => {
            const newPhoto = {
                ...action.payload,
                id: `local_${String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()}`,
                urls: {
                    small: action.payload.urls.small,
                    regular: action.payload.urls.small
                }
            };
            state.rawPhotos.unshift(newPhoto);
        },
    }
});

export const selectVisiblePhotos = createSelector(
    [(state: RootState) => state.photos.rawPhotos,
        (state: RootState) => state.photos.deletedIds],
    (raw, deleted) => raw.filter(photo => !deleted.includes(photo.id))
);

export const { setRawPhotos, toggleLike, deletePhoto, addNewPhoto } = photosSlice.actions;
export default photosSlice.reducer;