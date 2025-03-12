import { createSlice } from "@reduxjs/toolkit";
import { migrationPlanData } from "./migrationPlanActions";

const migrationPlanSlice = createSlice({
    name: 'migrationPlan',
    initialState: {
        migrationPlanData: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        setMigrationPlanData(state, action) {
            state.migrationPlanData.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(migrationPlanData.pending, (state) => {
                state.loading = true;
            })
            .addCase(migrationPlanData.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(migrationPlanData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
export const { setMigrationPlanData} = migrationPlanSlice.actions;

export const selectLoading = (state) => state.migrationPlan.loading;

export const migrationPlanReducer = migrationPlanSlice.reducer;