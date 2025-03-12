import { createSlice } from "@reduxjs/toolkit";
import {
    accountInfoTable,
    computeInfoTable,
    databaseInfoTable,
    maskingPolicies,
    postAccountLevelData,
    rolesTable,
    usersTable
} from "./accountLevelActions";


const accountLevelSlice = createSlice({
    name: 'accountLevel',
    initialState: {
        accountLevelData: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        addAccountLevelData(state, action) {
            state.accountLevelData.push(action.payload);
        },
        removeAccountLevelData(state, action) {
            state.accountLevelData = state.accountLevelData.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAccountLevelData.pending, (state) => {
                state.loading = true;
            })
            .addCase(postAccountLevelData.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(postAccountLevelData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

const rolesTableSlice = createSlice({
    name: 'rolesTable',
    initialState: {
        rolesTable: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setRolesTable(state, action) {
            state.rolesTable = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(rolesTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(rolesTable.fulfilled, (state, action) => {
            state.loading = false;
            state.rolesTable = action.payload;
        });
        builder.addCase(rolesTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})
const usersTableSlice = createSlice({
    name: 'usersTable',
    initialState: {
        usersTable: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setUserTable(state, action) {
            state.usersTable = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(usersTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(usersTable.fulfilled, (state, action) => {
            state.loading = false;
            state.usersTable = action.payload;
        });
        builder.addCase(usersTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})
const accountInfoTableSlice = createSlice({
    name: 'accountInfoTable',
    initialState: {
        accountInfo: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setAccountInfo(state, action) {
            state.accountInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(accountInfoTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        })
        builder.addCase(accountInfoTable.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.accountInfo = action.payload;
        })
        builder.addCase(accountInfoTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const computeInfoTableSlice=createSlice({
    name: 'computeInfoTable',
    initialState: {
        computeInfo: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setComputeInfo(state, action) {
            state.computeInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(computeInfoTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        })
        builder.addCase(computeInfoTable.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.computeInfo = action.payload;
        })
        builder.addCase(computeInfoTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const maskingPoliciesTableSlice=createSlice({
    name:'maskingPolicies',
    initialState: {
        maskingPoliciesTable: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setMaskingPoliciesTable(state, action) {
            state.maskingPoliciesTable = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(maskingPolicies.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        })
        builder.addCase(maskingPolicies.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.maskingPoliciesTable = action.payload;
        })
        builder.addCase(maskingPolicies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

const databaseInfoTableSlice=createSlice({
    name: 'databaseInfoTable',
    initialState: {
        databaseInfo: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setDatabaseInfo(state, action) {
            state.databaseInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(databaseInfoTable.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
        })
        builder.addCase(databaseInfoTable.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.databaseInfo = action.payload;
        })
        builder.addCase(databaseInfoTable.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const { addAccountLevelData, removeAccountLevelData } = accountLevelSlice.actions;
export const { setRolesTable } = rolesTableSlice.actions;
export const { setUserTable } = usersTableSlice.actions;
export const { setAccountInfo } = accountInfoTableSlice.actions;
export const { setComputeInfo } = computeInfoTableSlice.actions;
export const { setMaskingPoliciesTable } = maskingPoliciesTableSlice.actions;
export const { setDatabaseInfo } = databaseInfoTableSlice.actions;

export const selectLoading = (state) => state.accountLevel.loading;

export const accountLevelReducer = accountLevelSlice.reducer;
export const accountLevelRolesTableReducer = rolesTableSlice.reducer;
export const accountLevelUsersTableReducer = usersTableSlice.reducer;
export const accountLevelInfoTableReducer = accountInfoTableSlice.reducer;
export const accountLevelComputeInfoReducer = computeInfoTableSlice.reducer;
export const accountLevelMaskingPoliciesTableReducer = maskingPoliciesTableSlice.reducer;
export const accountLevelDatabaseInfoReducer = databaseInfoTableSlice.reducer;
