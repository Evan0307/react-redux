import React from "react";
import ReactDom from "react-dom";
import GetRouter from "~/router/router";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import  combineReducers  from  '~/redux/reducers/reducer'
import thunkMiddleware from 'redux-thunk';

if (module.hot) {
  module.hot.accept();
};

const store = createStore ( combineReducers ,applyMiddleware(thunkMiddleware ));
ReactDom.render(
    <Provider store = {store}>
    {GetRouter()}
    </Provider>
, document.getElementById("app"));
