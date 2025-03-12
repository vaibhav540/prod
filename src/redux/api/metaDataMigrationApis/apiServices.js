import axios from "axios";
import API_ENDPOINTS from "../apiEndpoints";


const baseURL = import.meta.env.VITE_FUNCTION_URL;

export const postAccountLevelRequest = (accountData) => {
    return axios.post(`${API_ENDPOINTS.SF_TO_BQ_SNOWFLAKE_CRAWLER}`, accountData);
};

export const postDatasetLevelRequest = (datasetData) => {
    return axios.post(`${API_ENDPOINTS.SF_to_BQ_DATASETLEVEL}`, datasetData);
};


export const fetchRolesTableRequest = ({ account_id, pageNo = 1 }) => {
    const query = `
        SELECT account_id, version, name, comment, FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_on) AS created_on,is_default,is_current,is_inherited,assigned_to_users,granted_to_roles,granted_roles,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
        FROM atgeir-accelerators.sf_to_bq.roles
        WHERE LOWER(account_id) = LOWER('${account_id}')
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id)
        ORDER BY version DESC
        LIMIT ${5}
        OFFSET ${(pageNo - 1) * 10}
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};

export const fetchUsersTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id, version, name, owner, roles ,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_on) AS created_on,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_success_login) AS last_success_login, FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
        FROM atgeir-accelerators.sf_to_bq.users 
        WHERE LOWER(account_id) = LOWER('${account_id}') 
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};

export const fetchAccountInfoTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id, version, region, FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
        FROM atgeir-accelerators.sf_to_bq.account_info 
        WHERE LOWER(account_id) = LOWER('${account_id}') 
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};

export const fetchAccountLevelComputeInfo = ({ account_id }) => {
    const query = `
       SELECT account_id, version, warehouse_name , size,min_cluster_count,max_cluster_count,type,scaling_policy,total_credits_last_90_days,average_daily_credits,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
       FROM atgeir-accelerators.sf_to_bq.compute_info 
       WHERE LOWER(account_id) = LOWER('${account_id}') 
       QUALIFY version = MAX(version) OVER (PARTITION BY account_id); 
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
}

export const fetchAccountLevelMaskingPolicies = ({ account_id }) => {
    const query = `
       SELECT account_id, version, policy_name, policy_schema,policy_catalog,policy_signature,policy_return_type,policy_body,owner_role_type, FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
       FROM atgeir-accelerators.sf_to_bq.masking_policies 
       WHERE LOWER(account_id) = LOWER('${account_id}')
       QUALIFY version = MAX(version) OVER (PARTITION BY account_id); 
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
}

export const fetchAccountLevelDatabaseInfo = ({ account_id }) => {
    const query = `
        SELECT account_id, version,database_name, database_owner,is_transient,schema_count,table_count,view_count,sp_count,fn_count,schemas,role_grants,  FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created) AS created,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime
        FROM atgeir-accelerators.sf_to_bq.database_info 
        WHERE LOWER(account_id) = LOWER('${account_id}') 
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
}

// ------------------------------------------------Database level -----------------------------------------------------

export const fetchFunctionsTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id, version, database_name, function_name, function_schema ,function_catalog_id,function_catalog,function_owner,function_language,function_definition,volatility,is_null_call,is_aggregate,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime 
        FROM atgeir-accelerators.sf_to_bq.functions 
        WHERE LOWER(account_id) = LOWER('${account_id}') 
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};

export const fetchSchemaTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id, version, schema_name, catalog_name, schema_owner ,retention_time,table_count,schema_type,owner_role_type,database_name,is_managed_access,is_transient,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created) AS created,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime 
        FROM atgeir-accelerators.sf_to_bq.schemas 
        WHERE LOWER(account_id) = LOWER('${account_id}')
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};
export const fetchStoredProceduresTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id, version, database_name, procedure_catalog, procedure_definition ,procedure_schema_id,procedure_schema,procedure_name,data_type,owner_role_type,procedure_catalog_id,procedure_language,procedure_owner,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created) AS created,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime 
        FROM atgeir-accelerators.sf_to_bq.stored_procedures 
        WHERE LOWER(account_id) = LOWER('${account_id}')
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');

    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
};

export const fetchTablesRequest=({account_id})=>{
    const query = `
    SELECT account_id,version, last_ddl,last_ddl_by, owner_role_type, row_count,bytes, table_catalog,database_name,table_name,table_owner,table_schema,table_schema_id,table_type,table_id, auto_clustering_on,is_typed, table_ddl,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,column_count,constraints,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created) AS created
    FROM atgeir-accelerators.sf_to_bq.tables 
    WHERE LOWER(account_id) = LOWER('${account_id}')
    QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
`.replace(/\s+/g, ' ');

return axios.post(`${baseURL}`, { query }, {
    headers: { "Content-Type": "application/json" }
});
}

export const fetchViewsTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id,version, owner_role_type, table_catalog,database_name,table_name,table_owner,table_schema,table_schema_id,table_id, view_definition,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', last_altered) AS last_altered,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created_datetime) AS created_datetime,FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S', created)
        FROM atgeir-accelerators.sf_to_bq.views
        WHERE LOWER(account_id) = LOWER('${account_id}')
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');
    
    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
}