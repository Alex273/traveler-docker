import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from '@app/AppRoot';
import {store, persister} from '@app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import './app/styles/main.scss';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <App />
        </PersistGate>
    </Provider>,
);
