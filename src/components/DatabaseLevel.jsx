import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Card, message, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { functionsTable, postDatabaseLevelData, schemasTable } from '../redux/metaDataMigration/databaseLevel/databaseLevelAction';
import CustomTabs from './CustomTabs';
import MigrationCard from '../shared/MigrationCard';
// import { postAccountLevelData, postDatasetLevelData } from '../redux/slice/metaDataMigrationSlice';

const { Title,Text } = Typography;

const DatasetLevel = () => {
  const [formData, setFormData] = useState({
    SNOWFLAKE_ACCOUNT: '',
    SNOWFLAKE_WAREHOUSE: 'COMPUTE_WH',
    DATABASE_NAME: '',
  });
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // const functions = useSelector((state) => state.functionsTable?.functions);
useSelector((state)=>console.log(state))
const functions=[
  {
      "account_id": "NT38835",
      "version": 4,
      "database_name": "DEV_OPS",
      "function_name": "LAST_MODIFIED_TO_TIMESTAMP",
      "function_schema": "CNTRL",
      "function_catalog_id": 9,
      "function_catalog": "DEV_OPS",
      "function_owner": "ACCOUNTADMIN",
      "function_language": "JAVASCRIPT",
      "function_definition": "\nvar {\n\tLAST_MODIFIED\n\t} = PROC_PARAMS;\n    return to_timestamp_tz(left(LAST_MODIFIED, len(LAST_MODIFIED) - 4) || ' ' || '00:00', 'DY, DD MON YYYY HH:MI:SS TZH:TZM')\n",
      "volatility": "VOLATILE",
      "is_null_call": true,
      "is_aggregate": false,
      "last_altered": "2022-03-03 17:35:34",
      "created_datetime": "2025-03-03 11:55:13"
  },
  {
      "account_id": "NT38835",
      "version": 4,
      "database_name": "DEV_OPS",
      "function_name": "LAST_MODIFIED_TO_TIMESTAMP",
      "function_schema": "CNTRL",
      "function_catalog_id": 9,
      "function_catalog": "DEV_OPS",
      "function_owner": "ACCOUNTADMIN",
      "function_language": "SQL",
      "function_definition": "\n    to_timestamp_tz(left(LAST_MODIFIED, len(LAST_MODIFIED) - 4) || ' ' || '00:00', 'DY, DD MON YYYY HH:MI:SS TZH:TZM')\n",
      "volatility": "VOLATILE",
      "is_null_call": true,
      "is_aggregate": false,
      "last_altered": "2022-03-03 17:58:58",
      "created_datetime": "2025-03-03 11:55:13"
  },
  {
      "account_id": "NT38835",
      "version": 4,
      "database_name": "DEV_OPS",
      "function_name": "STAGE_PATH_SHORTEN",
      "function_schema": "CNTRL",
      "function_catalog_id": 9,
      "function_catalog": "DEV_OPS",
      "function_owner": "ACCOUNTADMIN",
      "function_language": "JAVASCRIPT",
      "function_definition": "\n    /*\n        Removes the cloud provider prefix and stage name from the file path\n    */\n    var s3 = FILE_PATH.search(/s3:\/\//i);\n\n    if ( s3 != -1){\n        return FILE_PATH.substring(FILE_PATH.indexOf(\"/\", s3 + 5) + 1);\n    }\n\n    throw \"Unknown file path type.\"\n",
      "volatility": "VOLATILE",
      "is_null_call": true,
      "is_aggregate": false,
      "last_altered": "2022-03-03 18:34:26",
      "created_datetime": "2025-03-03 11:55:13"
  }
]
const schemas=[
  {
      "account_id": "NT38835",
      "version": 14,
      "schema_name": "PUBLIC",
      "catalog_name": "DEV_OPS",
      "schema_owner": "ACCOUNTADMIN",
      "retention_time": 1,
      "table_count": 1,
      "schema_type": "STANDARD",
      "owner_role_type": "ROLE",
      "database_name": "DEV_OPS",
      "is_managed_access": false,
      "is_transient": false,
      "last_altered": "2022-02-03 19:02:09",
      "created": "2022-02-03 19:02:09",
      "created_datetime": "2025-03-03 11:54:46"
  },
  {
      "account_id": "NT38835",
      "version": 14,
      "schema_name": "CNTRL",
      "catalog_name": "DEV_OPS",
      "schema_owner": "ACCOUNTADMIN",
      "retention_time": 1,
      "table_count": 1,
      "schema_type": "STANDARD",
      "owner_role_type": "ROLE",
      "database_name": "DEV_OPS",
      "is_managed_access": false,
      "is_transient": false,
      "last_altered": "2022-02-07 09:11:40",
      "created": "2022-02-07 09:11:40",
      "created_datetime": "2025-03-03 11:54:46"
  },
  {
      "account_id": "NT38835",
      "version": 14,
      "schema_name": "AUDIT",
      "catalog_name": "DEV_OPS",
      "schema_owner": "ACCOUNTADMIN",
      "retention_time": 1,
      "table_count": 1,
      "schema_type": "STANDARD",
      "owner_role_type": "ROLE",
      "database_name": "DEV_OPS",
      "is_managed_access": false,
      "is_transient": false,
      "last_altered": "2022-02-08 16:52:22",
      "created": "2022-02-08 16:52:22",
      "created_datetime": "2025-03-03 11:54:46"
  },
  {
      "account_id": "NT38835",
      "version": 14,
      "schema_name": "JOB",
      "catalog_name": "DEV_OPS",
      "schema_owner": "ACCOUNTADMIN",
      "retention_time": 1,
      "table_count": 1,
      "schema_type": "STANDARD",
      "owner_role_type": "ROLE",
      "database_name": "DEV_OPS",
      "is_managed_access": false,
      "is_transient": false,
      "last_altered": "2022-02-08 16:52:34",
      "created": "2022-02-08 16:52:34",
      "created_datetime": "2025-03-03 11:54:46"
  }
]
const storedProcedures =[
  {
      "account_id": "NT38835",
      "version": 11,
      "database_name": "MYDB",
      "procedure_catalog": "MYDB",
      "procedure_definition": "\nvar status='SUCCESS';\n\nvar sql_command2 =\"SELECT TABLE_NAME ,  COLUMN_NAME, PRIVACY_CATEGORY FROM  mydb.my_schema.EXTRACT_SEMANTIC_CATEGORIES_response_vw WHERE TABLE_NAME NOT IN (SELECT DISTINCT CONCAT(OBJECT_DATABASE,'.',OBJECT_SCHEMA,'.',OBJECT_NAME) FROM SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES WHERE OBJECT_DELETED IS NULL )\";\n\nvar stmt = snowflake.createStatement({  sqlText: sql_command2 });\nvar rs = stmt.execute();\n    try {\n            while (rs.next())    \n                {      \n                    var VAR_table_name = rs.getColumnValue('TABLE_NAME');   \n\t\t\t\t\tvar VAR_column_name = rs.getColumnValue('COLUMN_NAME'); \n\t\t\t\t\tvar VAR_PRIVACY_CATEGORY = rs.getColumnValue('PRIVACY_CATEGORY'); \n\n\t\t\t\t\tvar var_SQL_stmt = \"ALTER TABLE \" + VAR_table_name + \" MODIFY COLUMN \" +VAR_column_name + \" SET TAG DEMO_TAG='\" + VAR_PRIVACY_CATEGORY +\"';\"\t\t\t\t\t\n\n                    var stmt = snowflake.createStatement({ sqlText: var_SQL_stmt });\n                    var rs1 = stmt.execute();        \n                    rs1.next();\n                    ret_res= rs1.getColumnValue(1);\n                }\n        } catch(err)\n                {\n                        var status='Failed';\n                }    \nreturn status",
      "procedure_schema_id": 44,
      "procedure_schema": "MY_SCHEMA",
      "procedure_name": "ASSOCIATE_TAG",
      "data_type": "VARCHAR(16777216)",
      "owner_role_type": "ROLE",
      "procedure_catalog_id": 27,
      "procedure_language": "JAVASCRIPT",
      "procedure_owner": "ACCOUNTADMIN",
      "last_altered": "2024-02-14 11:12:19",
      "created": "2024-02-14 11:12:19",
      "created_datetime": "2025-03-10 05:42:41"
  }
]
const tables=[
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2024-02-14 16:57:22.142000+05:30",
      "last_ddl_by": "GAURAV",
      "owner_role_type": "ROLE",
      "row_count": 2,
      "bytes": 2560,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "HR_DATA",
      "table_owner": "PUBLIC",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 186370,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE HR_DATA (\n\tACCOUNT_NUMBER NUMBER(38,0) WITH TAG (MYDB.MY_SCHEMA.DEMO_TAG='IDENTIFIER', SNOWFLAKE.CORE.PRIVACY_CATEGORY='IDENTIFIER', SNOWFLAKE.CORE.SEMANTIC_CATEGORY='BANK_ACCOUNT'),\n\tFIRST_NAME VARCHAR(16777216),\n\tLAST_NAME VARCHAR(16777216),\n\tDOB DATE WITH TAG (MYDB.MY_SCHEMA.DEMO_TAG='QUASI_IDENTIFIER', SNOWFLAKE.CORE.PRIVACY_CATEGORY='QUASI_IDENTIFIER', SNOWFLAKE.CORE.SEMANTIC_CATEGORY='DATE_OF_BIRTH'),\n\tSALARY NUMBER(38,9) WITH TAG (MYDB.MY_SCHEMA.DEMO_TAG='SENSITIVE', SNOWFLAKE.CORE.PRIVACY_CATEGORY='SENSITIVE', SNOWFLAKE.CORE.SEMANTIC_CATEGORY='SALARY'),\n\tADDRESS VARCHAR(16777216),\n\tPIN NUMBER(28,0)\n);",
      "last_altered": "2024-12-18 12:56:06",
      "column_count": 14,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": null, \"constraint_name\": null, \"constraint_schema_id\": null, \"constraint_schema\": null, \"constraint_catalog_id\": null, \"constraint_catalog\": null, \"constraint_type\": null, \"constraint_created\": null}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2024-02-14 09:44:32"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2024-02-14 15:14:56.598000+05:30",
      "last_ddl_by": "GAURAV",
      "owner_role_type": "ROLE",
      "row_count": 1,
      "bytes": 7168,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "EXTRACT_SEMANTIC_CATEGORIES_RESPONSE",
      "table_owner": "PUBLIC",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 187394,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE EXTRACT_SEMANTIC_CATEGORIES_RESPONSE (\n\tTABLE_NAME VARCHAR(16777216),\n\tRESPONSE_JSON VARIANT\n);",
      "last_altered": "2024-12-18 12:56:06",
      "column_count": 4,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": null, \"constraint_name\": null, \"constraint_schema_id\": null, \"constraint_schema\": null, \"constraint_catalog_id\": null, \"constraint_catalog\": null, \"constraint_type\": null, \"constraint_created\": null}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2024-02-14 09:44:56"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2024-02-14 16:40:48.316000+05:30",
      "last_ddl_by": "GAURAV",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "EXTRACT_SEMANTIC_CATEGORIES_RESPONSE_VW",
      "table_owner": "ACCOUNTADMIN",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "VIEW",
      "table_id": 187396,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE EXTRACT_SEMANTIC_CATEGORIES_RESPONSE (\n\tTABLE_NAME VARCHAR(16777216),\n\tRESPONSE_JSON VARIANT\n);",
      "last_altered": "2024-02-14 11:10:48",
      "column_count": 8,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": null, \"constraint_name\": null, \"constraint_schema_id\": null, \"constraint_schema\": null, \"constraint_catalog_id\": null, \"constraint_catalog\": null, \"constraint_type\": null, \"constraint_created\": null}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2024-02-14 11:10:48"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-02-19 15:29:03.840000+05:30",
      "last_ddl_by": "DIPAKP",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "CUSTOMERS",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 247813,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE CUSTOMERS (\n\tCUSTOMER_ID NUMBER(38,0) NOT NULL,\n\tCUSTOMER_NAME VARCHAR(50),\n\tprimary key (CUSTOMER_ID)\n);",
      "last_altered": "2025-02-19 09:59:03",
      "column_count": 2,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": 31746, \"constraint_name\": \"SYS_CONSTRAINT_14261353-3cc3-4b3a-91fb-ffffa5f47a48\", \"constraint_schema_id\": 44, \"constraint_schema\": \"MY_SCHEMA\", \"constraint_catalog_id\": 27, \"constraint_catalog\": \"MYDB\", \"constraint_type\": \"PRIMARY KEY\", \"constraint_created\": \"2025-02-19 15:29:03.840000+05:30\"}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-02-19 09:59:03"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-02-19 15:29:05.141000+05:30",
      "last_ddl_by": "DIPAKP",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "ORDERS",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 249858,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE ORDERS (\n\tORDER_ID NUMBER(38,0) NOT NULL,\n\tCUSTOMER_ID NUMBER(38,0),\n\tprimary key (ORDER_ID),\n\tforeign key (CUSTOMER_ID) references MYDB.MY_SCHEMA.CUSTOMERS(CUSTOMER_ID)\n);",
      "last_altered": "2025-02-19 09:59:05",
      "column_count": 2,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": 33795, \"constraint_name\": \"SYS_CONSTRAINT_757d2fb0-9a49-4473-8f2e-3583639a98b6\", \"constraint_schema_id\": 44, \"constraint_schema\": \"MY_SCHEMA\", \"constraint_catalog_id\": 27, \"constraint_catalog\": \"MYDB\", \"constraint_type\": \"FOREIGN KEY\", \"constraint_created\": \"2025-02-19 15:29:05.141000+05:30\"}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-02-19 09:59:05"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-02-19 15:29:05.141000+05:30",
      "last_ddl_by": "DIPAKP",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "ORDERS",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 249858,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE ORDERS (\n\tORDER_ID NUMBER(38,0) NOT NULL,\n\tCUSTOMER_ID NUMBER(38,0),\n\tprimary key (ORDER_ID),\n\tforeign key (CUSTOMER_ID) references MYDB.MY_SCHEMA.CUSTOMERS(CUSTOMER_ID)\n);",
      "last_altered": "2025-02-19 09:59:05",
      "column_count": 2,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": 33793, \"constraint_name\": \"SYS_CONSTRAINT_c87a54e3-543e-4c4d-a9d7-3c997db81120\", \"constraint_schema_id\": 44, \"constraint_schema\": \"MY_SCHEMA\", \"constraint_catalog_id\": 27, \"constraint_catalog\": \"MYDB\", \"constraint_type\": \"PRIMARY KEY\", \"constraint_created\": \"2025-02-19 15:29:05.141000+05:30\"}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-02-19 09:59:05"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-02-19 15:31:39.473000+05:30",
      "last_ddl_by": "DIPAKP",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "ORDER_DETAILS",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 245765,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE ORDER_DETAILS (\n\tDETAIL_ID NUMBER(38,0) NOT NULL,\n\tORDER_ID NUMBER(38,0),\n\tPRODUCT_ID NUMBER(38,0),\n\tQUANTITY NUMBER(38,0),\n\tPRICE NUMBER(10,2),\n\tprimary key (DETAIL_ID),\n\tforeign key (ORDER_ID) references MYDB.MY_SCHEMA.ORDERS(ORDER_ID)\n);",
      "last_altered": "2025-02-19 10:01:39",
      "column_count": 5,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": 29698, \"constraint_name\": \"SYS_CONSTRAINT_8603f6d2-0c76-4f68-ac6c-0e7993042ede\", \"constraint_schema_id\": 44, \"constraint_schema\": \"MY_SCHEMA\", \"constraint_catalog_id\": 27, \"constraint_catalog\": \"MYDB\", \"constraint_type\": \"PRIMARY KEY\", \"constraint_created\": \"2025-02-19 15:31:39.473000+05:30\"}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-02-19 10:01:39"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-02-19 15:31:39.473000+05:30",
      "last_ddl_by": "DIPAKP",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "ORDER_DETAILS",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 245765,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE ORDER_DETAILS (\n\tDETAIL_ID NUMBER(38,0) NOT NULL,\n\tORDER_ID NUMBER(38,0),\n\tPRODUCT_ID NUMBER(38,0),\n\tQUANTITY NUMBER(38,0),\n\tPRICE NUMBER(10,2),\n\tprimary key (DETAIL_ID),\n\tforeign key (ORDER_ID) references MYDB.MY_SCHEMA.ORDERS(ORDER_ID)\n);",
      "last_altered": "2025-02-19 10:01:39",
      "column_count": 5,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": 29700, \"constraint_name\": \"SYS_CONSTRAINT_037d0f52-000d-46a5-9586-6f7357b4995a\", \"constraint_schema_id\": 44, \"constraint_schema\": \"MY_SCHEMA\", \"constraint_catalog_id\": 27, \"constraint_catalog\": \"MYDB\", \"constraint_type\": \"FOREIGN KEY\", \"constraint_created\": \"2025-02-19 15:31:39.473000+05:30\"}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-02-19 10:01:39"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-03-08 06:47:42.541000+05:30",
      "last_ddl_by": "BABITAK",
      "owner_role_type": "ROLE",
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "SCIENCE_TRAIN_DATASET",
      "table_owner": "MIGRATION_DEV",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_type": "BASE TABLE",
      "table_id": 256002,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE SCIENCE_TRAIN_DATASET (\n\tID VARCHAR(16777216),\n\tLABEL VARCHAR(16777216),\n\tSTRING_LABEL VARCHAR(16777216),\n\tTARGET_LIST VARCHAR(16777216),\n\tN_TARGETS NUMBER(38,0),\n\tNUCLEOPLASM NUMBER(38,0),\n\tNUCLEAR_MEMBRANE NUMBER(38,0),\n\tNUCLEOLI NUMBER(38,0),\n\tNUCLEOLI_FIBRILLAR_CENTER NUMBER(38,0),\n\tNUCLEAR_SPECKLES NUMBER(38,0),\n\tNUCLEAR_BODIES NUMBER(38,0),\n\tENDOPLASMIC_RETICULUM NUMBER(38,0),\n\tGOLGI_APPARATUS NUMBER(38,0),\n\tINTERMEDIATE_FILAMENTS NUMBER(38,0),\n\tACTIN_FILAMENTS NUMBER(38,0),\n\tMICROTUBULES NUMBER(38,0),\n\tMITOTIC_SPINDLE NUMBER(38,0),\n\tCENTROSOME NUMBER(38,0),\n\tPLASMA_MEMBRANE NUMBER(38,0),\n\tMITOCHONDRIA NUMBER(38,0),\n\tAGGRESOME NUMBER(38,0),\n\tCYTOSOL NUMBER(38,0),\n\tVESICLES NUMBER(38,0),\n\tNEGATIVE NUMBER(38,0),\n\tCELL_MASKS VARCHAR(16777216),\n\tDIMENSION NUMBER(38,0),\n\tBBOXES VARCHAR(16777216)\n);",
      "last_altered": "2025-03-08 01:17:42",
      "column_count": 27,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": null, \"constraint_name\": null, \"constraint_schema_id\": null, \"constraint_schema\": null, \"constraint_catalog_id\": null, \"constraint_catalog\": null, \"constraint_type\": null, \"constraint_created\": null}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-03-08 01:17:42"
  },
  {
      "account_id": "NT38835",
      "version": 19,
      "last_ddl": "2025-03-11 11:54:21.803000+05:30",
      "last_ddl_by": "VEDANTJ",
      "owner_role_type": null,
      "row_count": 0,
      "bytes": 0,
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "ALL_DATA_TYPES",
      "table_owner": null,
      "table_schema": "PUBLIC",
      "table_schema_id": 43,
      "table_type": "BASE TABLE",
      "table_id": 257026,
      "auto_clustering_on": false,
      "is_typed": true,
      "table_ddl": "create or replace TABLE ALL_DATA_TYPES (\n\tCOL_BOOLEAN BOOLEAN COMMENT 'Boolean data type',\n\tCOL_INTEGER NUMBER(38,0) COMMENT 'Integer data type',\n\tCOL_FLOAT FLOAT COMMENT 'Float data type',\n\tCOL_DOUBLE FLOAT COMMENT 'Double data type',\n\tCOL_NUMERIC NUMBER(10,2) COMMENT 'Numeric data type with precision and scale',\n\tCOL_DECIMAL NUMBER(10,2) COMMENT 'Decimal data type with precision and scale',\n\tCOL_REAL FLOAT COMMENT 'Real data type',\n\tCOL_DATE DATE COMMENT 'Date data type',\n\tCOL_TIME TIME(9) COMMENT 'Time data type',\n\tCOL_TIMESTAMP TIMESTAMP_NTZ(9) COMMENT 'Timestamp data type',\n\tCOL_TIMESTAMP_LTZ TIMESTAMP_LTZ(9) COMMENT 'Timestamp with local time zone data type',\n\tCOL_TIMESTAMP_NTZ TIMESTAMP_NTZ(9) COMMENT 'Timestamp without time zone data type',\n\tCOL_TIMESTAMP_TZ TIMESTAMP_TZ(9) COMMENT 'Timestamp with time zone data type',\n\tCOL_VARIANT VARIANT COMMENT 'Variant data type',\n\tCOL_OBJECT OBJECT COMMENT 'Object data type',\n\tCOL_ARRAY ARRAY COMMENT 'Array data type',\n\tCOL_BINARY BINARY(8388608) COMMENT 'Binary data type',\n\tCOL_VARBINARY BINARY(8388608) COMMENT 'Variable binary data type',\n\tCOL_GEOGRAPHY GEOGRAPHY COMMENT 'Geography data type',\n\tCOL_GEOMETRY GEOMETRY COMMENT 'Geometry data type',\n\tCOL_STRING VARCHAR(16777216) COMMENT 'String data type',\n\tCOL_TEXT VARCHAR(16777216) COMMENT 'Text data type',\n\tCOL_VARCHAR VARCHAR(255) COMMENT 'Variable character data type',\n\tCOL_CHAR VARCHAR(10) COMMENT 'Fixed-length character data type',\n\tCOL_BYTEINT NUMBER(38,0) COMMENT 'Byte integer data type'\n);",
      "last_altered": "2025-03-11 06:24:22",
      "column_count": 25,
      "constraints": "{\"PRIMARY KEY\": [], \"FOREIGN KEY\": [], \"partitioned_by\": null, \"auto_clustering_on\": \"NO\", \"constraint_id\": null, \"constraint_name\": null, \"constraint_schema_id\": null, \"constraint_schema\": null, \"constraint_catalog_id\": null, \"constraint_catalog\": null, \"constraint_type\": null, \"constraint_created\": null}",
      "created_datetime": "2025-03-11 06:47:16",
      "created": "2025-03-11 06:24:21"
  }
]
const views=[
  {
      "account_id": "NT38835",
      "version": 19,
      "owner_role_type": "ROLE",
      "table_catalog": "MYDB",
      "database_name": "MYDB",
      "table_name": "EXTRACT_SEMANTIC_CATEGORIES_RESPONSE_VW",
      "table_owner": "ACCOUNTADMIN",
      "table_schema": "MY_SCHEMA",
      "table_schema_id": 44,
      "table_id": 187396,
      "view_definition": "create view mydb.my_schema.EXTRACT_SEMANTIC_CATEGORIES_response_vw\nas \nSELECT TABLE_NAME ,\n    FLAT.KEY  AS COLUMN_NAME,\n    FLAT.value:\"recommendation\":\"privacy_category\"::VARCHAR as privacy_category,\n    FLAT.value:\"recommendation\":\"semantic_category\"::VARCHAR as semantic_category,\n    FLAT.value:\"recommendation\":\"confidence\"::VARCHAR as confidence,\n    FLAT.value:\"recommendation\":\"coverage\"::NUMBER(10,2) as coverage,\n    FLAT.value:\"details\"::variant as details,\n    FLAT.value:\"alternates\"::VARIANT as alternates\n  FROM mydb.my_schema.EXTRACT_SEMANTIC_CATEGORIES_response ,\n       LATERAL FLATTEN( INPUT => RESPONSE_JSON ) FLAT\n  WHERE FLAT.value:\"recommendation\":\"privacy_category\"::VARCHAR IS NOT NULL ;",
      "last_altered": "2024-02-14 11:10:48",
      "created_datetime": "2025-03-11 06:47:19",
      "created": "2024-02-14 11:10:48"
  }
]
  const isFormValid = Object.values(formData).every(value => value.trim() !== '');
  const formatTabKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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

  const runCrawler = async () => {
    await dispatch(postDatabaseLevelData(formData)).unwrap();
  };
  const formatText = (text) => {
    if (typeof text !== 'string') return '';
    return text
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
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

    for (const { action, name } of actions) {
      try {
        await dispatch(action({ account_id })).unwrap();
        
      } catch (error) {
        message.warning(`Some data (${name}) could not be loaded.`);
      }
    }
  };

  const tabsData = {
    functions : {
      columns: [
          { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
          { title: 'Database Name', dataIndex: 'database_name', key: 'database_name', width: 150 },
          { title: 'Function Name', dataIndex: 'function_name', key: 'function_name', width: 180 },
          { title: 'Function Schema', dataIndex: 'function_schema', key: 'function_schema', width: 150 },
          { title: 'Function Catalog', dataIndex: 'function_catalog', key: 'function_catalog', width: 150 },
          { title: 'Function Owner', dataIndex: 'function_owner', key: 'function_owner', width: 150 },
          { title: 'Function Language', dataIndex: 'function_language', key: 'function_language', width: 150 },
          { title: 'Volatility', dataIndex: 'volatility', key: 'volatility', width: 120 },
          { 
              title: 'Is Null Call', 
              dataIndex: 'is_null_call', 
              key: 'is_null_call', 
              width: 120,
              render: (value) => (value ? 'True' : 'False') 
          },
          { 
              title: 'Is Aggregate', 
              dataIndex: 'is_aggregate', 
              key: 'is_aggregate', 
              width: 120,
              render: (value) => (value ? 'True' : 'False') 
          },
          { title: 'Last Altered', dataIndex: 'last_altered', key: 'last_altered', width: 180 },
          { title: 'Created DateTime', dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
      ],
      data: functions?.map((info, index) => ({
          key: index,
          version: info.version,
          database_name: formatText(info.database_name) || 'NA',
          function_name: formatText(info.function_name) || 'NA',
          function_schema: formatText(info.function_schema) || 'NA',
          function_catalog: formatText(info.function_catalog) || 'NA',
          function_owner: formatText(info.function_owner) || 'NA',
          function_language: formatText(info.function_language) || 'NA',
          volatility: formatText(info.volatility) || 'NA',
          is_null_call: info.is_null_call || 'NA',
          is_aggregate: info.is_aggregate || 'NA',
          last_altered: formatText(info.last_altered) || 'NA',
          created_datetime: formatText(info.created_datetime) || 'NA'
      })) || []
  },  
    schemas : {
      columns: [
        { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
        { title: 'Schema Name', dataIndex: 'schema_name', key: 'schema_name', width: 150 },
        { title: 'Catalog Name', dataIndex: 'catalog_name', key: 'catalog_name', width: 180 }, 
        { title: 'Schema Owner', dataIndex: 'schema_owner', key: 'schema_owner', width: 180 }, 
        { title: 'Retention Time', dataIndex: 'retention_time', key: 'retention_time', width: 120 },
        { title: 'Table Count', dataIndex: 'table_count', key: 'table_count', width: 120 },
        { title: 'Schema Type', dataIndex: 'schema_type', key: 'schema_type', width: 150 },
        { title: 'Owner Role Type', dataIndex: 'owner_role_type', key: 'owner_role_type', width: 150 },
        { title: 'Database Name', dataIndex: 'database_name', key: 'database_name', width: 180 }, 
        { title: 'Managed Access', dataIndex: 'is_managed_access', key: 'is_managed_access', width: 150,   render: (value) => (value ? 'True' : 'False')  },
        { title: 'Is Transient', dataIndex: 'is_transient', key: 'is_transient', width: 120,   render: (value) => (value ? 'True' : 'False')  },
        { title: 'Last Altered', dataIndex: 'last_altered', key: 'last_altered', width: 200 },
        { title: 'Created Date', dataIndex: 'created_datetime', key: 'created_datetime', width: 200 }
      ],
      data: (schemas || []).map((info, index) => ({
        key: index,
        version: info.version,
        schema_name:  formatText(info.schema_name) || 'NA',
        catalog_name:  formatText(info.catalog_name) || 'NA',
        schema_owner:  formatText(info.schema_owner) || 'NA',
        retention_time: info.retention_time || 'NA',
        table_count: info.table_count || 'NA',
        schema_type:  formatText(info.schema_type) || 'NA',
        owner_role_type:  formatText(info.owner_role_type) || 'NA',
        database_name:  formatText(info.database_name )|| 'NA',
        is_managed_access:info.is_managed_access || 'NA',
        is_transient:info.is_transient||'NA',
        last_altered: info.last_altered || 'NA',
        created_datetime: info.created_datetime || 'NA'
      }))
    },
    stored_Procedures:{
        columns: [
          { title: "Version", dataIndex: "version", key: "version", width: 100 },
          { title: "Database Name", dataIndex: "database_name", key: "database_name", width: 150 },
          { title: "Procedure Catalog", dataIndex: "procedure_catalog", key: "procedure_catalog", width: 150 },
          { title: "Procedure Defination", dataIndex:"procedure_definition",key:"procedure_definition", width: 150, ellipsis: true },
          { title: "Procedure Schema ID", dataIndex:"procedure_schema_id",key:"procedure_schema_id", width: 150 },
          { title: "Procedure Schema", dataIndex: "procedure_schema", key: "procedure_schema", width: 150 },
          { title: "Procedure Name", dataIndex: "procedure_name", key: "procedure_name", width: 180 },
          { title: "Data Type", dataIndex: "data_type", key: "data_type", width: 150 },
          { title: "Owner Role Type", dataIndex: "owner_role_type", key: "owner_role_type", width: 150 },
          { title: "Procedure Language", dataIndex: "procedure_language", key: "procedure_language", width: 150 },
          { title: "Procedure Catalog ID", dataIndex: "procedure_catalog_id",key:"procedure_catalog_id", width: 150 },
          { title: "Procedure Owner", dataIndex: "procedure_owner", key: "procedure_owner", width: 150 },
          { title: "Created", dataIndex: "created", key: "created", width: 180},
          { title: "Last Altered", dataIndex: "last_altered", key: "last_altered",width: 180},
          { title: 'Created Date', dataIndex: 'created_datetime', key: 'created_datetime', width: 200 }
        ],
        data: storedProcedures?.map((info, index) => ({
          key: index,
          version: info.version,
          database_name: info.database_name || "NA",
          procedure_catalog: formatText(info.procedure_catalog) || "NA",
          procedure_definition: formatText(info.procedure_definition) || "NA",
          procedure_schema_id: info.procedure_schema_id || "NA",
          procedure_schema:formatText( info.procedure_schema) || "NA",
          procedure_name: formatText(info.procedure_name) || "NA",
          data_type: formatText(info.data_type) || "NA",
          owner_role_type: formatText(info.owner_role_type) || "NA",
          procedure_language: formatText(info.procedure_language )|| "NA",
          procedure_catalog_id: info.procedure_catalog_id || "NA",
          procedure_owner: formatText(info.procedure_owner) || "NA",
          created: info.created || "NA",
          last_altered: info.last_altered || "NA",
          created_datetime: info.created_datetime || "NA"
        })) || [], 
    },
    tables:{
      columns: [
        { title: 'Version', dataIndex:'version', key:'version', width: 100 },
        { title: 'Last DDL', dataIndex: 'last_ddl', key: 'last_ddl', width: 150,ellipsis: true },
        { title: 'Last DDL By', dataIndex:'last_ddl_by', key:'last_ddl_by', width: 150 },
        { title: 'Owner Role Type', dataIndex: 'owner_role_type', key: 'owner_role_type', width: 180 },
        { title: 'Row Count', dataIndex: 'row_count', key: 'row_count', width: 180 },
        { title: 'Bytes', dataIndex: 'bytes', key: 'bytes', width: 150 },
        { title: 'Table Catalog', dataIndex: 'table_catalog', key: 'table_catalog', width: 150 },
        { title: 'Databse Name', dataIndex: 'database_name', key: 'database_name', width: 150 },
        { title: 'Table Name', dataIndex: 'table_name', key: 'table_name', width: 180 ,ellipsis: true},
        { title: 'Table Owner', dataIndex: 'table_owner', key: 'table_owner', width: 180 },
        { title: 'Table Schema', dataIndex: 'table_schema', key: 'table_schema', width: 180 },
        { title: 'Table Schema ID', dataIndex: 'table_schema_id', key: 'table_schema_id', width: 180 },
        { title: 'Table Type', dataIndex: 'table_type', key: 'table_type', width: 180 },
        { title: 'Table ID', dataIndex: 'table_id', key: 'table_id', width: 180 },
        { title: 'Auto Clustering ON', dataIndex: 'auto_clustering_on', key: 'auto_clustering_on', width: 200 ,render: (value) => (value ? 'True' : 'False') },
        { title: 'Is Types', dataIndex: 'is_typed', key:'is_typed', width:150,render: (value) => (value ? 'True' : 'False') },
        { title: 'Table DDL', dataIndex: 'table_ddl', key:'table_ddl', width:150, ellipsis: true},
        { title: 'Column Count', dataIndex: 'column_count', key:'column_count', width:150},
        { title: 'Constraints', dataIndex: 'constraints', key:'constraints', width:150,ellipsis: true},
        { title: 'Created', dataIndex: 'created', key: 'created', width: 180},
        { title: 'Last Altered', dataIndex: 'last_altered', key: 'last_altered', width: 180},
        { title: 'Created Date', dataIndex: 'created_datetime', key: 'created_datetime', width: 200 }
      ],
      data: tables?.map((info, index) => ({
        key: index,
        version: info.version || "NA",
        last_ddl: formatText(info.last_ddl) || "NA",
        last_ddl_by: formatText(info.last_ddl_by) || "NA",
        owner_role_type: formatText(info.owner_role_type) || "NA",
        row_count: info.row_count || "NA",
        bytes: info.bytes || "NA",
        table_catalog: formatText(info.table_catalog) || "NA",
        database_name: info.database_name || "NA",
        table_name: info.table_name|| "NA",
        table_owner: formatText(info.table_owner) || "NA",
        table_schema: formatText(info.table_schema) || "NA",
        table_schema_id: info.table_schema_id || "NA",
        table_type: formatText(info.table_type) || "NA",
        table_id: info.table_id || "NA",
        auto_clustering_on: info.auto_clustering_on ? "True" : "False",
        is_typed: info.is_typed ? "True" : "False",
        table_ddl: formatText(info.table_ddl) || "NA",
        column_count: info.column_count || "NA",
        constraints: formatText(info.constraints) || "NA",
        created:info.created || "NA",
        last_altered:info.last_altered || "NA",
        created_datetime:info.created_datetime || "NA"
      })) || []
    },
    views:{
      columns: [
        { title: 'Version', dataIndex:'version', key:'version', width: 100 },
        { title: 'Owner Role Type', dataIndex: 'owner_role_type', key: 'owner_role_type', width: 180 },
        { title: 'Table Catalog', dataIndex: 'table_catalog', key: 'table_catalog', width: 150, ellipsis: true },
        { title: 'Database Name', dataIndex: 'database_name', key: 'database_name', width: 150 },
        { title: 'Table Name', dataIndex: 'table_name', key: 'table_name', width: 180, ellipsis: true },
        { title: 'Table Owner', dataIndex: 'table_owner', key: 'table_owner', width: 180 },
        { title: 'Table Schema', dataIndex:'table_schema', key:'table_schema', width: 100 },
        { title: 'Table Schema ID', dataIndex: 'table_schema_id', key: 'table_schema_id', width: 150, ellipsis: true },
        { title: 'Table ID', dataIndex: 'table_id', key: 'table_id', width: 150 },
        { title: 'View Definition', dataIndex: 'view_definition', key: 'view_definition', width: 180, ellipsis: true },
        { title: 'Created', dataIndex: 'created', key: 'created', width: 180},
        { title: 'Last Altered', dataIndex: 'last_altered', key: 'last_altered', width: 180},
        { title: 'Created Date', dataIndex: 'created_datetime', key: 'created_datetime', width: 200 }
      ],
      data: views?.map((info, index) => ({
        key: index,
        version: info.version || "NA",
        owner_role_type: formatText(info.owner_role_type) || "NA",
        table_catalog: info.table_catalog || "NA",
        database_name: info.database_name || "NA",
        table_name: info.table_name|| "NA",
        table_owner: formatText(info.table_owner) || "NA",
        table_schema: formatText(info.table_schema) || "NA",
        table_schema_id: info.table_schema_id || "NA",
        table_id: info.table_id || "NA",
        view_definition: formatText(info.view_definition) || "NA",
        created:info.created || "NA",
        last_altered:info.last_altered || "NA",
        created_datetime:info.created_datetime || "NA"
      })) || []
    }
    
  };
  const tabKeys = Object.keys(tabsData);
  const formattedTabs = tabKeys.map(formatTabKey);

  return (
    <>
       <MigrationCard
            title="Database Level Configuration"
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
            isFormValid={isFormValid} 
        />
      {/* <Card bordered className="account-level-card">
            <Title level={3} className="account-level-title">Database Level Configuration</Title>
            <Text type="secondary" className="account-level-description">
              Please enter your Snowflake account and Database name details to start the data migration process.
            </Text>
            <Row gutter={[16, 16]} align="middle" className="form-row">
              <Col xs={10} sm={7} className="input-col">
                <label className="input-label">Snowflake Account</label>
                <Input
                  placeholder="Enter Snowflake Account"
                  value={formData.SNOWFLAKE_ACCOUNT}
                  onChange={(e) => handleInputChange('SNOWFLAKE_ACCOUNT', e.target.value)}
                  disabled={loading}
                />
              </Col>
              <Col xs={2} className="arrow-col" >
                <FaLongArrowAltRight />
              </Col>
    
              <Col xs={10} sm={7} className="input-col">
                <label className="input-label">Database Name</label>
                <Input
                  placeholder="Enter Database Name"
                  value={formData.DATABASE_NAME}
                  onChange={(e) => handleInputChange('DATABASE_NAME', e.target.value)}
                  disabled={loading}
                />
              </Col>
              <Col xs={20} sm={8} className="input-col button-col">
                <Button
                  className="background-primary bold-text"
                  icon={loading ? <LoadingOutlined /> : ''}
                  size="large"
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  block
                >
                  {loading ? 'Starting Crawler...' : 'Start Crawler'}
                </Button>
              </Col>
            </Row>
          </Card> */}
                {/* {crawlerComplete && ( */}
        <>
          <CustomTabs
            tabs={formattedTabs}
            selectedTab={activeTab}
            setSelectedTab={(index,key) => {
              setActiveTab(index);
              setCurrentPage(1);
            }}
          />


          <Table
       scroll={{ x: 1000, y: 40 * 5 }}
        columns={tabsData[tabKeys[activeTab - 1]]?.columns || []}
        dataSource={tabsData[tabKeys[activeTab - 1]]?.data || []}
      bordered
      pagination={tabKeys[activeTab - 1] === 'roles' ? {
        current: currentPage,
        pageSize: 5,
        onChange: (page) => {
          // setCurrentPage(page);
          onPageChange(page);
        }
      } : false}
    />
 
        </>

      {/* )} */}
    </>
  );
};

const styles = {
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#595959',
  },
};

export default DatasetLevel;
