import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './app/store/StoreProvider';
import AppRouter from './app/routes/AppRouter';

const root = createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);