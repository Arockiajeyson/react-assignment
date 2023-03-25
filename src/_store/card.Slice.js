import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'data';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const cardActions = { ...slice.actions, ...extraActions };
export const cardReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        type: {}
    }
}

//card fetching

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        cards: getCards()
    };    

    function getCards() {
        // console.log('lls')
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}/cards?sortBy=name:asc&limit=100`)
        );
    }
}

function createExtraReducers() {
    return {
        ...getCards()
    };

    function getCards() {
        var { pending, fulfilled, rejected } = extraActions.cards;
        return {
            [pending]: (state) => {
                state.type = { loading: true };
            },
            [fulfilled]: (state, action) => {
                console.log(action.payload.results)
                state.type = action.payload;
                // console.log(state.type)
            },
            [rejected]: (state, action) => {
                console.log('llsd')
                state.type = { error: action.error };
            }
        };
    }
}
