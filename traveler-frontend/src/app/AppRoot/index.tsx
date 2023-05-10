import React, {FC} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
// import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
// import {mainTheme} from '@app/theme/main-theme';
import {Layout} from '@widgets/Layout';
import {Header} from '@widgets/Header';
import {Footer} from '@widgets/Footer';
// import {Header} from '@components/Header';
// import {useAuth} from '@app/hooks';
//import classNames from 'classnames';

export const App: FC = () => {
    //const {isImpersonate} = useAuth();
    //const mainClassName = isImpersonate ? classNames('main_container', 'main_container_impersonate') : 'main_container';

    return (
        <CookiesProvider>
            <BrowserRouter>
                <Header />
                <main>
                    <Layout />
                </main>
                <Footer />
            </BrowserRouter>
        </CookiesProvider>
    );
};
