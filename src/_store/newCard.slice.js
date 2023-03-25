import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'newCard';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const newCardActions = { ...slice.actions, ...extraActions };
export const newCardReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        new:card()
    };    

    function card() {
        return createAsyncThunk(
            `${name}/newAdd`,
            async ({ name,number,expiry}) => await fetchWrapper.post(`${baseUrl}/cards`, { name:`${name}'s card`,cardExpiration:expiry,cardHolder:name,cardNumber:number,category:'AE'})
        );
    }
}

function createExtraReducers() {
    return {
        ...card()
    };

    function card() {
        var { pending, fulfilled, rejected } = extraActions.new;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                console.log(action.payload)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('users', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                // const { from } = history.location.state || { from: { pathname: '/' } };
                // history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
