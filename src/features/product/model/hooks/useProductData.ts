import {useSelector} from "react-redux";
import {RootState} from "@/app/store/StoreProvider.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {UnsplashPhoto} from "@/shared/product/types/types.ts";

export const useProductData = (id: string): { photo : UnsplashPhoto, likedIds : string[] } => {
    const photo = useSelector((state: RootState) =>
        state.photos.rawPhotos.find(p => p.id === id));
    const navigate = useNavigate();
    const likedIds = useSelector((state: RootState) => state.photos.likedIds);
    useEffect(() => {
        if (!photo) navigate('/not-found', { replace: true });
    }, [photo]);

    return {photo, likedIds} ;
};