import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../arrays/list";
import { Cardtype } from "../../@types/Mytypes";
interface sliCecatgre {
    loading: boolean,
    error: string,
    cards: Cardtype[],
    cards2: Cardtype[],
}
const initialState: sliCecatgre = {
    loading: false,
    error: "",
    cards2: [],
    cards: [],
};

export const fetchUsers2 = createAsyncThunk<any[]>("homepage/fetchUsers2", () =>
    axios.get(`${Url}cards/homepage`).then((res) => res.data)
);


const homepage = createSlice({
    name: "homepage",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let index = state.cards.findIndex((e) => e._id === action.payload._id)
            if (index === -1) {
                state.cards = [...state.cards, action.payload]
            }
            else {
                state.cards.splice(index, 1)
            }
            localStorage.setItem('homepage', JSON.stringify(state.cards));

        }, addItems: (state, action) => {
            state.cards = action.payload
            localStorage.setItem('homepage', JSON.stringify(state.cards));
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers2.pending, (state, action) => {
                state.loading = true
                state.error = ''
            })
            .addCase(fetchUsers2.fulfilled, (state, action: any) => {
                state.loading = false
                state.cards2 = action.payload[0].products
            })
            .addCase(fetchUsers2.rejected, (state, action) => {
                state.loading = false
                state.cards2 = []
                state.error = 'Something went wrong'
            })
    },
});
// also exported fetchUsers at the top
export const { addItem, addItems } = homepage.actions;

//export the reducer
export default homepage.reducer