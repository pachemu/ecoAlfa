import { useState, useEffect } from 'react';
import { useGetPhotosQuery } from '@/app/api/productsApi';
import {
    deletePhoto,
    selectVisiblePhotos,
    setRawPhotos
} from '@/app/store/reducers/photosSlice';
import {useDispatch, useSelector} from "react-redux";
import {handleLike} from "@/features/product/model/hooks/handlers.ts";
import {RootState} from "@/app/store/StoreProvider.ts";
import {useNavigate} from "react-router-dom";

export const useProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [initialLoad, setInitialLoad] = useState(false);

    const { data: apiPhotos, isLoading, isError } = useGetPhotosQuery(
        { page: 1, perPage: 10 },
        { refetchOnMountOrArgChange: false }
    );

    const visiblePhotos = useSelector(selectVisiblePhotos);
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);

    useEffect(() => {
        if (apiPhotos && !initialLoad) {
            dispatch(setRawPhotos(apiPhotos));
            setInitialLoad(true);
        }
    }, [apiPhotos, dispatch, initialLoad]);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deletePhoto(id));
    };

    const filteredPhotos = visiblePhotos.filter(photo => {
        const matchesSearch = photo.alt_description?.toLowerCase().includes(searchText.toLowerCase()) ||
            photo.description?.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'liked' && likedIds.includes(photo.id));
        return matchesSearch && matchesFilter;
    });

    return {
        isLoading,
        isError,
        filteredPhotos,
        searchText,
        filter,
        setSearchText,
        setFilter,
        handleDelete,
        handleLike: (id: string, e: React.MouseEvent<HTMLElement>) => handleLike(id, dispatch, e),
        likedIds,
        navigate
    };
};