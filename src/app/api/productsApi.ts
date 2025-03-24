import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface UnsplashPhoto {
    id: string;
    urls: {
        small: string; regular: string;
    };
    description: string | null;
    alt_description: string | null;
    user: {
        name: string;
    };
    isLiked?: boolean;
}

export const unsplashApi = createApi({
    reducerPath: 'unsplashApi', baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.unsplash.com/'
    }), endpoints: (builder) => ({
        getPhotos: builder.query<UnsplashPhoto[], { page: number; perPage: number }>({
            query: ({page, perPage}) => ({
                url: 'photos', params: {
                    page, per_page: perPage, client_id: '9otiSCnwhZPK7hAZyhZWjMvzAonhkTMTzvvHJqMpgk4', // Ваш ключ
                },
            }),
        }),
    }),
});

export const {useGetPhotosQuery} = unsplashApi;