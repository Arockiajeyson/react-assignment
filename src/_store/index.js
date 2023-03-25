import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import {cardReducer} from './card.Slice'
import {newCardReducer} from './newCard.slice'
import {persistReducer} from 'redux-persist';
export * from './auth.slice';
export * from './users.slice';
export * from './card.Slice'

const persistConfi ={
    key:'cardnew',
    storage
}
const Reducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    cards:cardReducer,
    new:newCardReducer
})
const ComReducers =persistReducer(persistConfi,Reducer)
export const store = configureStore({
    reducer: ComReducers
});