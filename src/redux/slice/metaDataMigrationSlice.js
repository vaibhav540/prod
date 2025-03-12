// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import API_ENDPOINTS from "../api/apiEndpoints";
// let baseURL = import.meta.env.VITE_FUNCTION_URL;

// // export const postAccountLevelData = createAsyncThunk(
// //     'account/postDetails',
// //     async (accountData, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.post(
// //                 `${API_ENDPOINTS.SF_TO_BQ_SNOWFLAKE_CRAWLER}`,
// //                 accountData
// //             );
// //             return response.data;
// //         } catch (error) {

// //             if (error.response && error.response.status === 400) {
// //                 return rejectWithValue(error.response.data.message);
// //             } else {
// //                 return rejectWithValue("An unexpected error occurred. Please try again.");
// //             }
// //         }
// //     }
// // )
// // export const postDatasetLevelData = createAsyncThunk(
// //     'dataset/postDetails',
// //     async (datasetData, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.post(
// //                 `${API_ENDPOINTS.SF_to_BQ_DATASETLEVEL}`,
// //                 datasetData
// //             );
// //             return response.data;
// //         } catch (error) {

// //             if (error.response && error.response.status === 400) {
// //                 return rejectWithValue(error.response.data.message);
// //             } else {
// //                 return rejectWithValue("An unexpected error occurred. Please try again.");
// //             }
// //         }
// //     }
// // )

// // export const rolesTable = createAsyncThunk(
// //     "user/rolesTable",
// //     async ({ account_id ,pageNo=1}, { rejectWithValue }) => {
// //         try {

// //             const query = `
// //                  SELECT account_id, version, name
// //                  FROM atgeir-accelerators.sf_to_bq.roles
// //                  WHERE LOWER(account_id) = LOWER('${account_id}')
// //                  QUALIFY version = MAX(version) OVER (PARTITION BY account_id)
// //                  ORDER BY version DESC
// //                  LIMIT ${5}
// //                  OFFSET ${(pageNo - 1) * 10}
// //                 `.replace(/\s+/g, ' ');

// //             const response = await axios.post(`${baseURL}`, { query }, {
// //                 headers: { "Content-Type": "application/json" }
// //             });

// //             console.log("API Response:", response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error("API Error:", error);

// //             if (error.response) {
// //                 console.error("Response Data:", error.response.data);
// //                 if (error.response.status === 400) {
// //                     return rejectWithValue(error.response.data.message);
// //                 }
// //             }

// //             return rejectWithValue("Failed to select user table.");
// //         }
// //     }
// // );

// // export const usersTable = createAsyncThunk(
// //     "user/usersTable",
// //     async ({ account_id }, { rejectWithValue }) => {
// //         try {
// //             const query = `
// //                   SELECT account_id, version, name, owner, roles 
// //                   FROM atgeir-accelerators.sf_to_bq.users 
// //                   WHERE LOWER(account_id) = LOWER('${account_id}') 
// //                   QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
// //                 `.replace(/\s+/g, ' ');

// //             const response = await axios.post(`${baseURL}`, { query }, {
// //                 headers: { "Content-Type": "application/json" }
// //             });

// //             console.log("API Response users:", response.data);
// //             return response.data;
// //         } catch (error) {
// //             console.error("API Error:", error);

// //             if (error.response) {
// //                 console.error("Response Data:", error.response.data);
// //                 if (error.response.status === 400) {
// //                     return rejectWithValue(error.response.data.message);
// //                 }
// //             }

// //             return rejectWithValue("Failed to select user table.");
// //         }
// //     }
// // );


// const accountLevelSlice = createSlice({
//     name: 'accountLevel',
//     initialState: {
//         accountLevelData: [],
//         loading: false,
//         error: null,
//         successMessage: null,
//     },
//     reducers: {
//         addAccountLevelData(state, action) {
//             state.accountLevelData = [...state.accountLevelData, action.payload];
//         },
//         removeAccountLevelData(state, action) {
//             state.accountLevelData = state.accountLevelData.filter(item => item.id !== action.payload);
//         },
//         updateAccountLevelData(state, action) {
//             state.accountLevelData = state.accountLevelData.map(item =>
//                 item.id === action.payload.id ? action.payload : item
//             );
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(postAccountLevelData.fulfilled, (state, action) => {
//             state.loading = false;
//             state.successMessage = action.payload.message;
//             console.log("success", state.successMessage, action.payload)
//         });
//         builder.addCase(postAccountLevelData.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             console.error(`Error fetching account level data: ${action.error.message}`);
//         });
//         builder.addCase(postAccountLevelData.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//             state.successMessage = null;
//         });
//     }
// })

// const datasetLevelSlice = createSlice({
//     name: 'datasetLevel',
//     initialState: {
//         datasetLevelData: [],
//         loading: false,
//         error: null,
//         successMessage: null,
//     },
//     reducers: {
//         addDatasetLevelData(state, action) {
//             state.datasetLevelData = [...state.datasetLevelData, action.payload];
//         },
//         removeDatasetLevelData(state, action) {
//             state.datasetLevelData = state.datasetLevelData.filter(item => item.id !== action.payload);
//         },
//         updateDatasetLevelData(state, action) {
//             state.datasetLevelData = state.datasetLevelData.map(item =>
//                 item.id === action.payload.id ? action.payload : item
//             );
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(postDatasetLevelData.fulfilled, (state, action) => {
//             state.loading = false;
//             state.successMessage = action.payload.message;
//         });
//         builder.addCase(postDatasetLevelData.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//         builder.addCase(postDatasetLevelData.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//             state.successMessage = null;
//         });
//     }
// })

// const rolesTableSlice = createSlice({
//     name: 'rolesTable',
//     initialState: {
//         rolesTable: [],
//         loading: false,
//         error: null,
//         successMessage: null,
//     },
//     reducers: {
//         setRolesTable(state, action) {
//             state.rolesTable = action.payload;
//         },

//     },
//     extraReducers: (builder) => {
//         builder.addCase(rolesTable.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//             state.successMessage = null;
//         });
//         builder.addCase(rolesTable.fulfilled, (state, action) => {
//             state.loading = false;
//             state.rolesTable = action.payload;
//         });
//         builder.addCase(rolesTable.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//     }
// })
// const usersTableSlice = createSlice({
//     name: 'usersTable',
//     initialState: {
//         usersTable: [],
//         loading: false,
//         error: null,
//         successMessage: null,
//     },
//     reducers: {
//         setUserTable(state, action) {
//             state.usersTable = action.payload;
//         },

//     },
//     extraReducers: (builder) => {
//         builder.addCase(usersTable.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//             state.successMessage = null;
//         });
//         builder.addCase(usersTable.fulfilled, (state, action) => {
//             state.loading = false;
//             state.usersTable = action.payload;
//         });
//         builder.addCase(usersTable.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });
//     }
// })

// export const { addAccountLevelData, removeAccountLevelData, updateAccountLevelData } = accountLevelSlice.actions;
// export const { addDatasetLevelData, removeDatasetLevelData, updateDatasetLevelData } = datasetLevelSlice.actions;
// export const { setUserTable } = usersTableSlice.actions;
// export const { setRolesTable } = rolesTableSlice.actions;
// export const selectLoading = (state) => state.accountLevel.loading;
// export const accountLevelReducer = accountLevelSlice.reducer;
// export const datasetLevelReducer = datasetLevelSlice.reducer;
// export const userTableReducer = usersTableSlice.reducer;
// export const rolesTableReducer = rolesTableSlice.reducer;