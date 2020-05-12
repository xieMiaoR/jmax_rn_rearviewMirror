
import React, {Component} from 'react';
import {Root} from './router/index';
import store from './store/index';
import { Provider } from 'react-redux';
export default class App extends Component{
    render() {
        return <Provider store={store}>
            <Root/>
        </Provider>;
    }
}