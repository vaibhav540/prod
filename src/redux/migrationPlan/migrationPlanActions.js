import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMigrationPlanTableRequest } from "../api/migrationPlanApis/apiServices";

export const migrationPlanData = createAsyncThunk(
    'account/migrationPlan',
    async (accountData, { rejectWithValue }) => {
        try {
            const response = await fetchMigrationPlanTableRequest(accountData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An unexpected error occurred. Please try again.");
            }
        }
    }
);