import React, { useState } from 'react'
import MigrationCard from '../shared/MigrationCard'
import { useDispatch } from 'react-redux';
import { Select, Table, Typography, Card } from "antd";

const { Option } = Select;
const { Title } = Typography;
const MigrationPlan = () => {
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const migrationPlans = [
    {
        "account_id": "NT38835",
        "version": 26,
        "database_name": "MYDB",
        "strategy": "Performance-Optimized Plan",
        "batches": "[{\"batch_number\": 1, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"SNOWPIPE_DEMP\"}], \"estimated_time\": \"1 hour\", \"dependencies\": []}, {\"batch_number\": 2, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES\"}], \"estimated_time\": \"30 minutes\", \"dependencies\": []}, {\"batch_number\": 3, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"HR_DATA\"}], \"estimated_time\": \"15 minutes\", \"dependencies\": []}, {\"batch_number\": 4, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MASKING_DEMO\"}], \"estimated_time\": \"10 minutes\", \"dependencies\": []}, {\"batch_number\": 5, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP\"}], \"estimated_time\": \"5 minutes\", \"dependencies\": []}, {\"batch_number\": 6, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE\"}], \"estimated_time\": \"3 minutes\", \"dependencies\": []}, {\"batch_number\": 7, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"ENTITLEMENT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"CARD\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST123\"}], \"estimated_time\": \"2 minutes\", \"dependencies\": []}, {\"batch_number\": 8, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE_VW\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"CUSTOMERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDER_DETAILS\"}], \"estimated_time\": \"1 minute\", \"dependencies\": []}, {\"batch_number\": 9, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS_SECURE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST_VIEW\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_FLAT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TABLE_VIEW_ESC\"}], \"estimated_time\": \"1 minute\", \"dependencies\": []}, {\"batch_number\": 10, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"SCIENCE_TRAIN_DATASET\"}], \"estimated_time\": \"1 minute\", \"dependencies\": []}]"
    },
    {
        "account_id": "NT38835",
        "version": 26,
        "database_name": "MYDB",
        "strategy": "Cost-Optimized Plan",
        "batches": "[{\"batch_number\": 1, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"SNOWPIPE_DEMP\"}], \"estimated_time\": \"2 hours\", \"dependencies\": []}, {\"batch_number\": 2, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES\"}], \"estimated_time\": \"45 minutes\", \"dependencies\": []}, {\"batch_number\": 3, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"HR_DATA\"}], \"estimated_time\": \"30 minutes\", \"dependencies\": []}, {\"batch_number\": 4, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MASKING_DEMO\"}], \"estimated_time\": \"20 minutes\", \"dependencies\": []}, {\"batch_number\": 5, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP\"}], \"estimated_time\": \"10 minutes\", \"dependencies\": []}, {\"batch_number\": 6, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE\"}], \"estimated_time\": \"5 minutes\", \"dependencies\": []}, {\"batch_number\": 7, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"ENTITLEMENT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"CARD\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST123\"}], \"estimated_time\": \"3 minutes\", \"dependencies\": []}, {\"batch_number\": 8, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE_VW\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"CUSTOMERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDER_DETAILS\"}], \"estimated_time\": \"2 minutes\", \"dependencies\": []}, {\"batch_number\": 9, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS_SECURE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST_VIEW\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_FLAT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TABLE_VIEW_ESC\"}], \"estimated_time\": \"2 minutes\", \"dependencies\": []}, {\"batch_number\": 10, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"SCIENCE_TRAIN_DATASET\"}], \"estimated_time\": \"2 minutes\", \"dependencies\": []}]"
    },
    {
        "account_id": "NT38835",
        "version": 26,
        "database_name": "MYDB",
        "strategy": "Hybrid Plan",
        "batches": "[{\"batch_number\": 1, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"SNOWPIPE_DEMP\"}], \"estimated_time\": \"1.5 hours\", \"dependencies\": []}, {\"batch_number\": 2, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES\"}], \"estimated_time\": \"40 minutes\", \"dependencies\": []}, {\"batch_number\": 3, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"HR_DATA\"}], \"estimated_time\": \"20 minutes\", \"dependencies\": []}, {\"batch_number\": 4, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MASKING_DEMO\"}], \"estimated_time\": \"15 minutes\", \"dependencies\": []}, {\"batch_number\": 5, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP\"}], \"estimated_time\": \"8 minutes\", \"dependencies\": []}, {\"batch_number\": 6, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE\"}], \"estimated_time\": \"4 minutes\", \"dependencies\": []}, {\"batch_number\": 7, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"ENTITLEMENT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"CARD\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST123\"}], \"estimated_time\": \"2.5 minutes\", \"dependencies\": []}, {\"batch_number\": 8, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"EXTRACT_SEMANTIC_CATEGORIES_RESPONSE_VW\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"CUSTOMERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDERS\"}, {\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"ORDER_DETAILS\"}], \"estimated_time\": \"1.5 minutes\", \"dependencies\": []}, {\"batch_number\": 9, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VS_CARDS_SECURE\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TEST_VIEW\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_FLAT\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_TEST\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"DATA_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMPLOYEE_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"EMP_INFO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"INFORMATION_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"JSON_DEMO_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"MAPPING_TABLE_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TAG_EMP_VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"VIEW_ESC\"}, {\"database\": \"MYDB\", \"schema\": \"PUBLIC\", \"name\": \"TABLE_VIEW_ESC\"}], \"estimated_time\": \"1.5 minutes\", \"dependencies\": []}, {\"batch_number\": 10, \"tables\": [{\"database\": \"MYDB\", \"schema\": \"MY_SCHEMA\", \"name\": \"SCIENCE_TRAIN_DATASET\"}], \"estimated_time\": \"1.5 minutes\", \"dependencies\": []}]"
    }
]
const [selectedPlan, setSelectedPlan] = useState(() => {
  const firstPlan = migrationPlans[0] || {};
  let parsedBatches = [];
  try {
    parsedBatches = firstPlan.batches ? JSON.parse(firstPlan.batches) : [];
  } catch (error) {
    console.error("Error parsing initial batches:", error);
  }

  return {
    ...firstPlan,
    batches: parsedBatches, // Ensure batches is an array
  };
});

const formattedMigrationPlans = migrationPlans.map(plan => ({
  ...plan,
  batches: JSON.parse(plan.batches) // Convert string to array
}));

  const [formData, setFormData] = useState({
    SNOWFLAKE_ACCOUNT: '',
    SNOWFLAKE_WAREHOUSE: 'COMPUTE_WH',
    DATABASE_NAME: '',
  });
  const dispatch = useDispatch()

  const columns = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Database Name",
      dataIndex: "database_name",
      key: "database_name",
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
    },
  ];

  const handleStrategyChange = (value) => {
    const plan = migrationPlans.find((plan) => plan.strategy === value);
    if (!plan) return;
  
    setSelectedPlan({
      ...plan,
      batches: JSON.parse(plan.batches),
    });
  };
  

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const account_id = formData?.SNOWFLAKE_ACCOUNT?.split('.')[0];

    try {
      await runCrawler();
      message.success('Crawler completed successfully!');
      await fetchAllTables(account_id);
      setCrawlerComplete(true);
    } catch (error) {
      message.error(`Failed to start crawler: ${error.message || 'Unknown error'}`);
    }
  };

    const fetchAllTables = async (account_id) => {
      const actions = [
        { action: functionsTable, name: 'Functions' },
        { action: schemasTable, name: 'Schmeas' },
        // { action: accountInfoTable, name: 'Account Info' },
        // { action: computeInfoTable, name: 'Compute Info' },
        // { action: maskingPolicies, name: 'Masking Policies' },
        // { action: databaseInfoTable, name: 'Database Info' },
      ];
    }
    const handleExpand = (expanded, record) => {
      setExpandedRowKeys((prev) =>
        expanded ? [...prev, record.batch_number] : prev.filter((key) => key !== record.batch_number)
      );
    };
    
    const expandedRowRender = (record) => {
      return (
        <Table
          columns={[
            { title: "Batch Number", dataIndex: "batch_number", key: "batch_number" },
            { title: "Estimated Time", dataIndex: "estimated_time", key: "estimated_time" },
          ]}
          dataSource={JSON.parse(record.batches)} 
          rowKey="batch_number"
          pagination={false}
        />
      );
    };
    
  return (
    <>
    <MigrationCard
    title="Migration Plan"
    description="Please enter your Snowflake account and Database name details to start the data migration process."
    labelLeft="Snowflake Account"
    valueLeft={formData.SNOWFLAKE_ACCOUNT}
    onChangeLeft={(value) => handleInputChange('SNOWFLAKE_ACCOUNT', value)}
    placeholderLeft="Enter Snowflake Account"
    labelRight="Database Name"
    valueRight={formData.DATABASE_NAME}
    onChangeRight={(value) => handleInputChange('DATABASE_NAME', value)}
    placeholderRight="Enter Database Name"
    buttonText="Start Crawler"
    loading={loading}
    onSubmit={handleSubmit}
    isFormValid={formData.SNOWFLAKE_ACCOUNT && formData.DATABASE_NAME}
/>
<Table
      columns={columns}
      dataSource={migrationPlans}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [record.key] : []);
        },
      }}
      rowKey="key"
    />
    </>

  )
}

export default MigrationPlan