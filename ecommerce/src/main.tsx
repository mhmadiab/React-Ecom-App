
import { createRoot } from 'react-dom/client'
//styles:
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css'

//Customized Routing:
import AppRouter from '@routes/AppRouter';

//Axios Config:
import  './services/axios-global'

//Redux:
import  { Provider } from 'react-redux'
import {store, persistor} from '@store/index'

import  { PersistGate } from 'redux-persist/integration/react';






createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null}  persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
)
