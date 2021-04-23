import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Approutes from './routes/Approutes';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import setCurrentUserToStore from './store/configureStore';


import rootReducer from './Reducers/store';
const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

setCurrentUserToStore(store)
ReactDOM.render(
  <Provider store={store}>
    <Approutes  />
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
