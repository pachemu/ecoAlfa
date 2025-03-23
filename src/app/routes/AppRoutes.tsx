import {useRoutes} from 'react-router-dom';
import Product from '../../pages/Product/Product.tsx';
import CreateProduct from "../../pages/CreateProduct/CreateProduct.tsx";
import ListOfProducts from "../../pages/ListOfProducts/ListOfProducts.tsx";

const AppRoutes = () => {
    const routes = useRoutes([
        {path: '/', element: <ListOfProducts/>},
        {path: '/create-product', element: <CreateProduct/>},
        {path: '/product/:id', element: <Product/>},
    ]);

    return routes;
};

export default AppRoutes;