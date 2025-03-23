import {configureStore} from '@reduxjs/toolkit';
import {unsplashApi} from "../api/productsApi.ts";

export const store = configureStore({
    reducer: {
        [unsplashApi.reducerPath]: unsplashApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(unsplashApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;