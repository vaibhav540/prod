export const fetchMigrationPlanTableRequest = ({ account_id }) => {
    const query = `
        SELECT account_id,version,database_name,strategy, batches
        FROM atgeir-accelerators.sf_to_bq.views
        WHERE LOWER(account_id) = LOWER('${account_id}')
        QUALIFY version = MAX(version) OVER (PARTITION BY account_id);
    `.replace(/\s+/g, ' ');
    
    return axios.post(`${baseURL}`, { query }, {
        headers: { "Content-Type": "application/json" }
    });
}