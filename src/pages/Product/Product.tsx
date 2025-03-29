
import {useNavigate, useParams} from "react-router-dom";
import {Card, Spin} from "antd";
import styles from './Product.module.scss'
import {ProductForm} from "@/widgets/product/ui/ProductForm.tsx";
import {ProductActions} from "@/widgets/product/ui/ProductActions.tsx";
import {ProductImageUpload} from "@/widgets/product/ui/ProductImageUpload.tsx";
import {useProductHandlers} from "@/features/product/model/hooks/useProductHandlers.ts";
import {BackButton} from "@/widgets/product/ui/BackButton.tsx";
import {ProductImagePreview} from "@/widgets/product/ui/ProductImagePreview.tsx";
import {ProductMeta} from "@/widgets/product/ui/ProductMeta.tsx";
import {useProductData} from "../../features/product/model/hooks/useProductData.ts";

export default function Product() {
    const {id} = useParams<{ id: string }>();
    const {photo, likedIds} = useProductData(id);
    const {isEditing, imageUrl, form, handlers} = useProductHandlers(id, photo);
    const navigate = useNavigate()
    if (!photo) return <Spin size="large" className={styles.spin}/>;

    return (
        <Card className={styles.main}>
            <BackButton onClick={() => navigate(-1)}/>

            <div className={styles.main_card}>
                <Card.Grid className={styles.main_card_preview}>
                    <ProductImagePreview imageUrl={imageUrl} alt={photo.description}/>
                </Card.Grid>
                    <div className={styles.main_card_description}>
                        {isEditing ? (
                            <ProductForm form={form} onSave={handlers.handleSave}/>
                        ) : (
                            <ProductMeta
                                title={photo.alt_description}
                                description={photo.description}
                                author={photo.user?.name}
                            />
                        )}
                    </div>
                <ProductActions
                    isEditing={isEditing}
                    isLiked={likedIds.includes(photo.id)}
                    onLike={handlers.handleLike}
                    onEdit={handlers.handleEdit}
                    onSave={handlers.handleSave}
                    onCancel={handlers.handleCancel}
                />
                {isEditing && <ProductImageUpload onChange={handlers.handleImageChange}/>}
            </div>
        </Card>
    );
}