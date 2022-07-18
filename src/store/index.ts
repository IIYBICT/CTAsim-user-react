import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import userReducer from "./reducer/userReducer";
import appReducer from "./reducer/appReducer";
import railReducer from "./reducer/railReducer";
import railActivityReducer from "./reducer/railActivityReducer";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const UserPersistConfig = {
  key: "user",
  storage,
  blacklist: ["UserInfo", "UserInfoLoading"],
};

const AppPersistConfig = {
  key: "app",
  storage,
  blacklist: [],
};

const RailPersistConfig = {
  key: "rail",
  storage,
  blacklist: ["RailInfo", "RailInfoLoading", "RegisterRailLoading"],
};
const RailActivityPersistConfig = {
  key: "railActivity",
  storage,
  blacklist: [
    "railActivityInfo",
    "railActivityInfoLoading",
    "railActivityList",
    "railActivityListSize",
    "railActivityListLoading",
  ],
};
const reducer = combineReducers({
  app: persistReducer(AppPersistConfig, appReducer),
  user: persistReducer(UserPersistConfig, userReducer),
  rail: persistReducer(RailPersistConfig, railReducer),
  railActivity: persistReducer(RailActivityPersistConfig, railActivityReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persist = persistStore(store);

export { store, persist };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
