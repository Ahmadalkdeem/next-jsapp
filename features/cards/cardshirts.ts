import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sliCecatgre, Cardtype } from "../../@types/Mytypes";
import axios from "axios";
import { Url } from "../../arrays/list";
const initialState: sliCecatgre = {
    loading: false,
    error: "",
    users: [],
    findusers: [],
    search: false,
    value: { size: [], colors: [], catgre: [], brands: [], stopfindusers: false, stopusers: false },
};

export const fetchUsers = createAsyncThunk<any[]>("user/fetchUsers", (length1: any) =>
    axios.get(`${Url}cards/filtering/Shirtsproduct`, { params: { skip: 0 } }).then((res) => res.data));

const cardshirts = createSlice({
    name: "card",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let arr: Cardtype[] = []
            if (state.search === false) {
                action.payload.forEach((element: Cardtype) => {
                    const index = state.users.findIndex((c: Cardtype) => c._id === element._id);
                    if (index === -1) {
                        arr.push(element)
                    }
                });
                state.users = [...state.users, ...arr]
            }
            else {
                action.payload.forEach((element: Cardtype) => {
                    const index = state.findusers.findIndex((c: Cardtype) => c._id === element._id);
                    if (index === -1) {
                        arr.push(element)
                    }
                });
                state.findusers = [...state.findusers, ...arr]
            }
        }, addfindusers: (state, action) => {
            state.findusers = action.payload
            state.search = true
            state.value.stopfindusers = false
        }, search: (state) => {
            state.search = false
        }, onchange: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true
                state.error = ''
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = [...action.payload]

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error.message ?? 'Something went wrong'
            })
    },
});
// also exported fetchUsers at the top
export const { addItem, addfindusers, search, onchange } = cardshirts.actions;

//export the reducer
export default cardshirts.reducer