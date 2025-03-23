import {useParams} from "react-router-dom";

export default function Product() {
    const {id} = useParams()
    console.log(id)

    return <h1>продукт</h1>;
}