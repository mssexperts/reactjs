import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import sagas from './sagas';

const store = (history) => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  const reducers = connectRouter(history)(rootReducer);

  const configStore = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware)));

  sagaMiddleware.run(sagas);

  return configStore;
};

export default store;
