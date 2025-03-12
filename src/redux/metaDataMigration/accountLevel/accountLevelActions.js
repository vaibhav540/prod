import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAccountInfoTableRequest,
    fetchAccountLevelComputeInfo,
    fetchAccountLevelDatabaseInfo,
    fetchAccountLevelMaskingPolicies,
    fetchRolesTableRequest,
    fetchUsersTableRequest,
    postAccountLevelRequest
} from "../../api/metaDataMigrationApis/apiServices";


export const postAccountLevelData = createAsyncThunk(
    'account/postDetails',
    async (accountData, { rejectWithValue }) => {
        try {
            const response = await postAccountLevelRequest(accountData);
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

export const rolesTable = createAsyncThunk(
    "account/rolesTable",
    async ({ account_id, pageNo = 1 }, { rejectWithValue }) => {
        try {
            const response = await fetchRolesTableRequest({ account_id, pageNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch roles table.");
        }
    }
);

export const usersTable = createAsyncThunk(
    "account/usersTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchUsersTableRequest({ account_id });
            console.log("API Response users:", response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch users table.");
        }
    }
);

export const accountInfoTable = createAsyncThunk(
    "account/accountInfoTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchAccountInfoTableRequest({ account_id });
            console.log("accountInfoTable",response);
            
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch account info table.");
        }
    }
)

export const computeInfoTable=createAsyncThunk(
    "account/computeInfoTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchAccountLevelComputeInfo({ account_id });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch compute info table.");
        }
    }
)

export const maskingPolicies=createAsyncThunk(
    "account/maskingPolicies",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchAccountLevelMaskingPolicies({ account_id });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch masking policies.");
        }
    }
)

export const databaseInfoTable=createAsyncThunk(
    "account/databaseInfoTable",
    async ({ account_id }, { rejectWithValue }) => {
        try {
            const response = await fetchAccountLevelDatabaseInfo({ account_id });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch database info table.");
        }
    }
)
