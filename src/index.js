import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store/store';
import App from './App';

import './index.scss';

const rootElement = document.getElementById('root');
render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
