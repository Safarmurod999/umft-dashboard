import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../const/data";

const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

export const fetchData = createAsyncThunk(
    "data/fetchData",
    async ({ apiEndpoint, accessToken }, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/${apiEndpoint}`, { headers: { "Authorization": `Bearer ${accessToken}` } })

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);
export const addData = createAsyncThunk(
    "data/addData",
    async ({ apiEndpoint, newData, accessToken }, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/${apiEndpoint}`, newData, { headers: { "Authorization": `Bearer ${accessToken}` } });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateData = createAsyncThunk(
    "data/updateData",
    async ({ apiEndpoint, newData, accessToken }, thunkAPI) => {
        try {
            console.log(newData);
            const response = await axios.put(
                `${BASE_URL}/${apiEndpoint}`,
                newData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteData = createAsyncThunk(
    "data/deleteData",
    async ({ apiEndpoint, id, accessToken }, thunkAPI) => {
        try {
            await axios.delete(`${BASE_URL}/${apiEndpoint}/${id}`, { headers: { "Authorization": `Bearer ${accessToken}` } });
            return id;
        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addData.pending, (state) => {
                state.error = null;
            })
            .addCase(addData.fulfilled, (state, action) => {
                location.reload();
            })
            .addCase(addData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateData.pending, (state) => {
                state.error = null;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data = state.data.map((item) => {
                    if (item._id === action.payload._id) {
                        return action.payload;
                    }
                    return item;
                }
                );
            })
            .addCase(updateData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteData.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteData.fulfilled, (state, action) => {

                state.data = state.data.filter(
                    (item) => item._id !== action.payload
                );
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.error = action.payload;

            });
    },
});

export default dataSlice.reducer;
export const { } = dataSlice.actions;