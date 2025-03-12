import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFunctionsTableRequest, fetchStoredProceduresTableRequest, fetchViewsTableRequest, postDatasetLevelRequest } from "../../api/metaDataMigrationApis/apiServices";

export const postDatabaseLevelData = createAsyncThunk(
    'database/postDetails',
    async (databaseData, { rejectWithValue }) => {
        try {
            const response = await postDatasetLevelRequest(databaseData);
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

export const functionsTable = createAsyncThunk(
    "database/functionsTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchFunctionsTableRequest({ account_id, pageNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch roles table.");
        }
    }
);

export const schemasTable=createAsyncThunk(
    "database/schemasTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchSchemaTableRequest({ account_id, pageNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch schemas table.");
        }
    }
)

export const storedProceduresTable=createAsyncThunk(
    "database/storedProceduresTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchStoredProceduresTableRequest({ account_id, pageNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch stored procedures table.");
        }
    }
)

export const viewsTable = createAsyncThunk(
    "database/viewsTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchViewsTableRequest({ account_id, pageNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch stored procedures table.");
        }
    }
)
