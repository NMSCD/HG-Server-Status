/* @refresh reload */
import { render } from 'solid-js/web';
import { StatusApp } from './statusApp';
import { CustomThemeProvider } from './themeProvider';

import './scss/custom.scss';

render(() =>
    <CustomThemeProvider>
        <StatusApp />
    </CustomThemeProvider>,
    document.getElementById('status-nmscd') as HTMLElement
);
