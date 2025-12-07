import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favouritesReducer from "./favouritesSlice";

const persistConfig = {     
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, favouritesReducer);

export const store = configureStore({
  reducer: {
    favourites: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
