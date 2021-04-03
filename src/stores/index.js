import { combineReducers, createStore } from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage/session";

import { LoginReducer } from "./reducers/LoginReducer";

const persistConfig = {
   key: "root",
   storage,
};

const rootReducer = combineReducers({
   LoginReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
   const store = createStore(enhancedReducer);
   const persistor = persistStore(store);
   return { store, persistor };
}
