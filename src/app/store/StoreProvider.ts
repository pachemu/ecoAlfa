import {configureStore} from '@reduxjs/toolkit';
import {unsplashApi} from "../api/productsApi.ts";
import photosSlice from "./reducers/photosSlice.ts";

export const store = configureStore({
    reducer: {
        [unsplashApi.reducerPath]: unsplashApi.reducer,
        photos: photosSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(unsplashApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;