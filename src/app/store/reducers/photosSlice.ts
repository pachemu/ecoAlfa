import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UnsplashPhoto} from "../../api/productsApi.ts";
import {RootState} from "../StoreProvider.ts";

interface PhotosState {
    likedPhotos: Record<string, boolean>;
    photos: UnsplashPhoto[];
    deletedIds: string[];
}

const loadInitialState = (): PhotosState => {
    const savedLikes = localStorage.getItem("likedPhotos");
    const savedDeleted = localStorage.getItem("deletedIds");

    return {
        likedPhotos: savedLikes ? JSON.parse(savedLikes) : {},
        photos: [],
        deletedIds: savedDeleted ? JSON.parse(savedDeleted) : [] // Инициализируем удаленные ID
    };
};

const photosSlice = createSlice({
    name: "photos",
    initialState: loadInitialState(),
    reducers: {
        toggleLike: (state, action: PayloadAction<string>) => {
            const photoId = action.payload;
            state.likedPhotos[photoId] = !state.likedPhotos[photoId];
            localStorage.setItem("likedPhotos", JSON.stringify(state.likedPhotos));
        },
        addPhotos: (state, action: PayloadAction<UnsplashPhoto[]>) => {
            const newPhotos = action.payload.filter(photo =>
                !state.deletedIds.includes(photo.id) &&
                !state.photos.some(p => p.id === photo.id)
            );

            state.photos.push(...newPhotos);
        },
        deletePhoto: (state, action: PayloadAction<string>) => {
            const photoId = action.payload;

            // Удаляем из основного списка
            state.photos = state.photos.filter(photo => photo.id !== photoId);

            // Добавляем в список удаленных
            state.deletedIds.push(photoId);
            localStorage.setItem("deletedIds", JSON.stringify(state.deletedIds));

            // Удаляем из лайков
            if (state.likedPhotos[photoId]) {
                delete state.likedPhotos[photoId];
                localStorage.setItem("likedPhotos", JSON.stringify(state.likedPhotos));
            }
        },
    }
});

export const selectVisiblePhotos = createSelector(
    [(state: RootState) => state.photos.photos],
    (photos) => photos
);

export const selectLikedPhotos = (state: RootState) => state.photos.likedPhotos;
export const selectSortedPhotos = createSelector(
    [selectVisiblePhotos, selectLikedPhotos],
    (photos, likedPhotos) => photos.filter(photo => likedPhotos[photo.id])
);

export const { toggleLike, addPhotos, deletePhoto } = photosSlice.actions;
export default photosSlice.reducer;