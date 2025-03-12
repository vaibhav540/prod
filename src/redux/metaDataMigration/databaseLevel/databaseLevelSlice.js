import { createSlice } from "@reduxjs/toolkit";
import { functionsTable, postDatabaseLevelData, schemasTable, storedProceduresTable, viewsTable } from "./databaseLevelAction";


const databaseLevelSlice = createSlice({
    name: 'databaseLevel',
    initialState: {
        databaseLevelData: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        addDatabaseLevelData(state, action) {
            state.databaseLevelData.push(action.payload);
        },
        removeDatabaseLevelData(state, action) {
            state.databaseLevelData = state.databaseLevelData.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postDatabaseLevelData.pending, (state) => {
                state.loading = true;
            })
            .addCase(postDatabaseLevelData.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(postDatabaseLevelData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


const functionsTableSlice = createSlice({
    name: 'functionsTable',
    initialState: {
        functions: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setFunctionsTable(state, action) {
            state.functions = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(functionsTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(functionsTable.fulfilled, (state, action) => {
            state.loading = false;
            state.functionsTable = action.payload;
        });
        builder.addCase(functionsTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const schemasTableSlice=createSlice({
    name:'schemasTable',
    initialState: {
        schemas: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setSchemasTable(state, action) {
            state.schemas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(schemasTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(schemasTable.fulfilled, (state, action) => {
            state.loading = false;
            state.schemasTable = action.payload;
        });
        builder.addCase(schemasTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const storedProceduresSlice=createSlice({
    name:'storedProceduresTable',
    initialState: {
        storedProcedures: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setStoredProceduresTable(state, action) {
            state.storedProcedures = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(storedProceduresTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(storedProceduresTable.fulfilled, (state, action) => {
            state.loading = false;
            state.storedProceduresTable = action.payload;
        });
        builder.addCase(storedProceduresTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})
const viewsTableSlice=createSlice({
    name:'viewsTable',
    initialState: {
        views: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setViewsTable(state, action) {
            state.views = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(viewsTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(viewsTable.fulfilled, (state, action) => {
            state.loading = false;
            state.viewsTable = action.payload;
        });
        builder.addCase(viewsTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const { addDatabaseLevelData, removeDatabaseLevelData } = databaseLevelSlice.actions;
export const { setFunctionsTable } = functionsTableSlice.actions;
export const {setSchemasTable} = schemasTableSlice.actions;
export const {setStoredProceduresTable} = storedProceduresSlice.actions;
export const {setViewsTable} = viewsTableSlice.actions;

export const selectLoading = (state) => state.databaseLevel.loading;

export const databaseLevelReducer = databaseLevelSlice.reducer;
export const functionsTableReducer = functionsTableSlice.reducer;
export const schemasTableReducer = schemasTableSlice.reducer;
export const storedProceduresTableReducer = storedProceduresSlice.reducer;
export const viewsTableReducer = viewsTableSlice.reducer;