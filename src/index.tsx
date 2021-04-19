import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loading from './components/Loading';
import Toast from './components/Toast';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

ReactDOM.render(
    <Provider store={store}>
        <Loading/>
    </Provider>,
    document.getElementById('loading')
);

ReactDOM.render(
    <Provider store={store}>
        <Toast/>
    </Provider>,
    document.getElementById('toast')
);
