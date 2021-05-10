import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage/session";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

import { LoginReducer } from "./reducers/LoginReducer";
import { CartReducer } from "./reducers/CartReducer";

const persistConfig = {
   key: "root",
   storage,
};

const rootReducer = combineReducers({
   LoginReducer,
   CartReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
   const store = createStore(
      enhancedReducer,
      applyMiddleware(promiseMiddleware, ReduxThunk, logger)
   );
   const persistor = persistStore(store);
   return { store, persistor };
}
