import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import BurgerBuilderReducer from './store/reducers/BugerBuilderReducer';
import OrderReducer from './store/reducers/orderReducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  brgbuilder: BurgerBuilderReducer,
  order: OrderReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
