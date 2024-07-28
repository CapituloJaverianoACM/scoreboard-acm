import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import resultsReducer from './resultsSlice';
import problemReducer from './problemSlice';
import teamReducer from './teamSlice';
import teamStatusReducer from './teamStatusSlice';
import contestReducer from './contestSlice';
import timerReducer from './timerSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    results: resultsReducer,
    problems: problemReducer,
    teams : teamReducer,
    teamStatus : teamStatusReducer,
    contest : contestReducer,
    timer: timerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(createStateSyncMiddleware({
            blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
        })),
});

initMessageListener(store);

export const persistor = persistStore(store);
export default store;