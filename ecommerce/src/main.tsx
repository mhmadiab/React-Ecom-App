
import { createRoot } from 'react-dom/client'
//styles:
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css'

//Customized Routing:
import AppRouter from '@routes/AppRouter';

//Redux:
import  { Provider } from 'react-redux'
import store from '@store/index'





createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
