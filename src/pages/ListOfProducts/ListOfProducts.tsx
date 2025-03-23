import {useGetPhotosQuery} from "../../app/api/productsApi.ts";
import {Button, Card, List} from "antd";
import {useNavigate} from "react-router-dom";


export default function ListOfProducts() {
    const {data: photos, isLoading, isError} = useGetPhotosQuery({page: 1, perPage: 10});
    const navigate = useNavigate();
    if (isError) return <div>Error</div>
    console.log(photos)
    const handleCardClick = (id:number) => {
        navigate(`/product/${id}`)
    }
    return (<div>
        <h1>Список продуктов</h1>
        <List
            grid={{
                gutter: 16, column: 4
            }}
            loading={isLoading}
            pagination={{position: 'top', align: 'center'}}
            dataSource={photos}
            renderItem={(item, id) => (
                <List.Item>
                    <Card
                        onClick={() => handleCardClick(id)}
                        hoverable
                        style={{minHeight: 300}}
                        title={item.alt_description}
                        cover={
                        <img
                            style={{height: 600}}
                            alt={item.description}
                            src={item.urls.small}/>}
                    >
                    </Card>
                </List.Item>
            )}
        >

        </List>
    </div>)

}