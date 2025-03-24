import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UnsplashPhoto} from "../../api/productsApi.ts";

interface PhotosState {
    likedPhotos: Record<string, boolean>; 
    photos: UnsplashPhoto[];
}

const loadInitialState = (): PhotosState => {
    const saved = localStorage.getItem("likedPhotos");
    return {
        likedPhotos: saved ? JSON.parse(saved) : {},
        photos: []
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
            state.photos = action.payload;
        }
    }
});

export const { toggleLike, addPhotos } = photosSlice.actions;
export default photosSlice.reducer;