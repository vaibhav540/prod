import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/authenticationSlice";
import { 
    accountLevelComputeInfoReducer, 
    accountLevelDatabaseInfoReducer, 
    accountLevelInfoTableReducer, 
    accountLevelMaskingPoliciesTableReducer, 
    accountLevelReducer, 
    accountLevelRolesTableReducer, 
    accountLevelUsersTableReducer 
} from "./metaDataMigration/accountLevel/accountLevelSlice";
import { 
    databaseLevelReducer, 
    functionsTableReducer, 
    schemasTableReducer, 
    storedProceduresTableReducer, 
    viewsTableReducer 
} from "./metaDataMigration/databaseLevel/databaseLevelSlice";
import { migrationPlanReducer } from "./migrationPlan/migrationPlanSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        accountLevel: accountLevelReducer,
        rolesTable: accountLevelRolesTableReducer,
        userTable: accountLevelUsersTableReducer,
        accountInfoTable: accountLevelInfoTableReducer,
        computeInfoTable:accountLevelComputeInfoReducer,
        maskingPoliciesTable: accountLevelMaskingPoliciesTableReducer,
        databaseInfoTable:accountLevelDatabaseInfoReducer,
        databaseLevel:databaseLevelReducer,
        functionsTable:functionsTableReducer,
        schemasTable:schemasTableReducer,
        storedProceduresTable:storedProceduresTableReducer,
        viewsTable:viewsTableReducer,
        migrationPlan:migrationPlanReducer
    }
});
