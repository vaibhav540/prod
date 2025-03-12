import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Card, message, Tabs, Table } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { accountInfoTable, computeInfoTable, databaseInfoTable, maskingPolicies, postAccountLevelData, rolesTable, usersTable } from '../redux/metaDataMigration/accountLevel/accountLevelActions.js';
import { FaLongArrowAltRight } from 'react-icons/fa';
import CustomTabs from './CustomTabs';
import Loader from './Loader';
import { ellipse } from 'framer-motion/client';
import { LABELS } from "../constants/labels.js"
import MigrationCard from '../shared/MigrationCard.jsx';

const { Title, Text } = Typography;

const AccountLevel = () => {
    const [formData, setFormData] = useState({
        SNOWFLAKE_ACCOUNT: '',
        SNOWFLAKE_WAREHOUSE: 'COMPUTE_WH',
        BIGQUERY_PROJECT: '',
        BIGQUERY_DATASET: 'sf_to_bq',
    });

    const [activeTab, setActiveTab] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [crawlerComplete, setCrawlerComplete] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.accountLevel?.loading);
    // const roleTable = useSelector((state) => state.rolesTable?.rolesTable);
    // const userTable = useSelector((state) => state.userTable?.usersTable);
    // const accountInfo = useSelector((state) => state.accountInfoTable?.accountInfo);
    // const computeInfo = useSelector((state) => state.computeInfoTable?.computeInfo);
    // const maskingPoliciesData = useSelector((state) => state.maskingPoliciesTable?.maskingPoliciesTable);
    // const databaseInfoData = useSelector((state) => state.databaseInfoTable?.databaseInfo);
    const roleTable = [
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "MIGRATION_DEV",
            "comment": "",
            "created_on": "2025-02-17 08:33:15",
            "is_default": true,
            "is_current": true,
            "is_inherited": false,
            "assigned_to_users": 8,
            "granted_to_roles": 0,
            "granted_roles": 0,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "ACCOUNTADMIN",
            "comment": "Account administrator can manage all aspects of the account.",
            "created_on": "2022-01-29 14:48:56",
            "is_default": false,
            "is_current": false,
            "is_inherited": false,
            "assigned_to_users": 8,
            "granted_to_roles": 0,
            "granted_roles": 2,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "INDIA_ROLE",
            "comment": "",
            "created_on": "2022-09-28 06:04:37",
            "is_default": false,
            "is_current": false,
            "is_inherited": false,
            "assigned_to_users": 2,
            "granted_to_roles": 0,
            "granted_roles": 1,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "POVERTY_ROLE",
            "comment": "",
            "created_on": "2022-10-06 12:43:56",
            "is_default": false,
            "is_current": false,
            "is_inherited": false,
            "assigned_to_users": 1,
            "granted_to_roles": 0,
            "granted_roles": 0,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "MIDDLE_CLASS_ROLE",
            "comment": "",
            "created_on": "2022-10-06 12:43:56",
            "is_default": false,
            "is_current": false,
            "is_inherited": false,
            "assigned_to_users": 1,
            "granted_to_roles": 0,
            "granted_roles": 0,
            "created_datetime": "2025-03-07 06:36:47"
        }
    ]
    const userTable = [
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "AMEY",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2025-02-18 06:45:53",
            "last_success_login": "2025-02-26 07:22:15",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "ANAND",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN"
            ],
            "created_on": "2022-01-29 14:48:56",
            "last_success_login": "2022-11-15 04:42:10",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "BABITAK",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN",
                "MIGRATION_DEV"
            ],
            "created_on": "2025-03-03 06:12:45",
            "last_success_login": "2025-03-07 05:55:13",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "DINESHR",
            "owner": "ACCOUNTADMIN",
            "roles": [],
            "created_on": "2025-02-24 09:52:39",
            "last_success_login": null,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "DIPAKP",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "DATAGEIR_RW",
                "ACCOUNTADMIN",
                "MIGRATION_DEV"
            ],
            "created_on": "2022-04-20 04:44:52",
            "last_success_login": "2025-03-07 06:28:32",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "GAURAV",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "USA_ROLE",
                "TAG_ADMIN",
                "DATAGEIR_RW",
                "SFADF_ROLE",
                "VS_ROLE",
                "ACCOUNTADMIN",
                "SYSADMIN",
                "INDIA_ROLE"
            ],
            "created_on": "2022-03-30 07:16:39",
            "last_success_login": "2024-08-05 03:59:26",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "GDHAWAS",
            "owner": "USERADMIN",
            "roles": [
                "SNOWFLAKE_DW_ENG_NONPROD",
                "SNOWFLAKE_DW_ENG_NONPROD"
            ],
            "created_on": "2022-02-03 18:16:45",
            "last_success_login": "2022-05-23 07:27:58",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "HARSHWARDHANJ",
            "owner": "ACCOUNTADMIN",
            "roles": [],
            "created_on": "2025-02-24 06:33:00",
            "last_success_login": "2025-02-25 08:00:41",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "HEMANTH",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN"
            ],
            "created_on": "2022-05-25 13:15:08",
            "last_success_login": "2022-05-25 13:15:53",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "MANISH",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN",
                "SECURITYADMIN"
            ],
            "created_on": "2022-02-10 16:21:53",
            "last_success_login": "2023-07-06 08:59:46",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "MIGRATION_USER",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2025-02-17 10:05:48",
            "last_success_login": "2025-03-07 06:36:03",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "NEWEL",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN",
                "SYSADMIN"
            ],
            "created_on": "2022-02-02 05:45:52",
            "last_success_login": "2022-03-16 05:09:08",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "PRATIKSHA",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2025-02-17 08:34:24",
            "last_success_login": "2025-03-05 10:23:06",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "RAGINI",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2023-04-14 08:55:23",
            "last_success_login": null,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "RAGINIL",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2025-02-26 06:00:02",
            "last_success_login": "2025-03-03 08:29:11",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "SAVIO",
            "owner": "ACCOUNTADMIN",
            "roles": [],
            "created_on": "2023-04-14 08:52:52",
            "last_success_login": "2023-04-14 12:01:20",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "SEJAL",
            "owner": "ACCOUNTADMIN",
            "roles": [],
            "created_on": "2023-04-14 08:57:13",
            "last_success_login": null,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "SHAUNAK",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "USA_ROLE",
                "WORKING_CLASS_ROLE",
                "SFADF_ROLE",
                "UPPER_CLASS_ROLE",
                "MIDDLE_CLASS_ROLE",
                "POVERTY_ROLE",
                "INDIA_ROLE"
            ],
            "created_on": "2022-09-26 11:40:03",
            "last_success_login": "2022-11-23 04:49:09",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "SNOWFLAKE",
            "owner": "",
            "roles": [
                "ACCOUNTADMIN"
            ],
            "created_on": "2022-01-29 14:48:56",
            "last_success_login": null,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "VEDANTJ",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "MIGRATION_DEV"
            ],
            "created_on": "2025-02-17 08:34:22",
            "last_success_login": "2025-03-03 07:32:25",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "VIKRAM",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN"
            ],
            "created_on": "2022-02-02 05:32:14",
            "last_success_login": "2025-02-24 10:11:51",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "VIPUL_B",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "ACCOUNTADMIN"
            ],
            "created_on": "2022-09-05 10:31:57",
            "last_success_login": "2025-02-18 13:49:45",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "name": "VSINGH",
            "owner": "ACCOUNTADMIN",
            "roles": [
                "VS_ROLE"
            ],
            "created_on": "2023-10-09 15:16:24",
            "last_success_login": "2023-10-10 16:48:05",
            "created_datetime": "2025-03-07 06:36:47"
        }

    ]
    const accountInfo = [
        {
            "account_id": "NT38835",
            "version": 124,
            "region": "AWS_US_EAST_2",
            "created_datetime": "2025-03-07 06:36:47"
        }
    ]
    const computeInfo = [
        {
            "account_id": "NT38835",
            "version": 124,
            "warehouse_name": "COMPUTE_WH",
            "size": "X-Small",
            "min_cluster_count": 1,
            "max_cluster_count": 1,
            "type": "STANDARD",
            "scaling_policy": "STANDARD",
            "total_credits_last_90_days": 30.978558707,
            "average_daily_credits": 0.231183273933,
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "warehouse_name": "SYSTEM$STREAMLIT_NOTEBOOK_WH",
            "size": "X-Small",
            "min_cluster_count": 1,
            "max_cluster_count": 10,
            "type": "STANDARD",
            "scaling_policy": "STANDARD",
            "total_credits_last_90_days": 0,
            "average_daily_credits": 0,
            "created_datetime": "2025-03-07 06:36:47"
        }
    ]
    const maskingPoliciesData = [
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "ACCOUNT_NUMBER_MASK",
            "policy_schema": "MY_SCHEMA",
            "policy_catalog": "MYDB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false,\"parameterType\":\"NONE\"}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "CASE WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN') \n\t   THEN val\n\t   ELSE -1\n  END",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "ACCOUNT_NAME_MASK",
            "policy_schema": "MY_SCHEMA",
            "policy_catalog": "MYDB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false,\"parameterType\":\"NONE\"}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "CASE WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN') \n       THEN val\n\t   ELSE '***MASKED***'\n  END",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "SENSITIVE_INFO_MASKING_NUMBERS",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"SALARY\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then (salary)\n    else random()\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASKING_STRING",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"DEPT\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then dept\n    else '****************'\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_TAG_NUMBERS",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else -999999\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_STRING",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else '****************'\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_TAG_DEPT",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n when current_role() in ('SFADF_ROLE') then val\n else '**masked**'\n end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_DEPT",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"DEPT\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n when current_role() in ('SFADF_ROLE') then DEPT\n else '**masked**'\n end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "SENSITIVE_INFO_MASKING_STRING",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"DEPT\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then dept\n    else '****************'\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASKING_NUMBERS",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"SALARY\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then (salary)\n    else (select random() as salary from table(generator(rowcount => (select count(*) from emp_info))))\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_DATE",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"DATE\",\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"DATE\",\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else date_from_parts(0001, 01, 01)::DATE\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_EMAIL",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else REGEXP_REPLACE(val,'.+\\@','*****@')\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_SALARY",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"SALARY\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n when current_role() in ('SFADF_ROLE') then SALARY\n else -999999\n end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "SENSITIVE_INFO_MASKING_NUMBERS",
            "policy_schema": "COLUMN_LEVEL_MASKIN",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"SALARY\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then (salary)\n    else (select random())\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_TAG_EMAIL",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else REGEXP_REPLACE(val,'.+\\@','*****@')\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_TAG_DATE",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"DATE\",\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"DATE\",\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else date_from_parts(0001, 01, 01)::DATE\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_NUMBERS",
            "policy_schema": "PUBLIC",
            "policy_catalog": "SFADF_DB",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true},\"hasDefaultValue\":false}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "case\n    when current_role() in ('SFADF_ROLE') then val\n    else -999999\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_DATE",
            "policy_schema": "WA",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"DATE\",\"nullable\":true}}]}",
            "policy_return_type": "{\"type\":\"DATE\",\"nullable\":true}",
            "policy_body": "CASE\n  WHEN EXISTS (SELECT ROLE FROM DATA_MASKING_ENTITLEMENT WHERE MASK_METHOD='UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL\n  ELSE DATE_FROM_PARTS(0001, 01, 01)::DATE\nEND",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "EMAIL_MASK_V02",
            "policy_schema": "PUBLIC",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "CASE\n    WHEN EXISTS (SELECT ROLE FROM ENTITLEMENT WHERE MASK_METHOD='UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL\n    ELSE REGEXP_REPLACE(VAL,'.+\\@','*****@')\n  END",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_EMAIL2",
            "policy_schema": "WA",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "CASE WHEN EXISTS(SELECT ROLE FROM DATA_MASKING_ENTITLEMENT WHERE MASK_METHOD = 'UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL \nELSE REGEXP_REPLACE(VAL, '.+\\@','*****@') END",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "CARD_MASK",
            "policy_schema": "PUBLIC",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "CASE\n  WHEN EXISTS (SELECT ROLE FROM ENTITLEMENT WHERE MASK_METHOD='UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL \n  ELSE echoMaskedValue(VAL)\nEND",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_AMOUNT",
            "policy_schema": "WA",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}}]}",
            "policy_return_type": "{\"type\":\"FIXED\",\"precision\":38,\"scale\":0,\"nullable\":true}",
            "policy_body": "CASE\n  WHEN EXISTS (SELECT ROLE FROM DATA_MASKING_ENTITLEMENT WHERE MASK_METHOD='UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL\n  ELSE 0\nEND",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "EMAIL_MASK",
            "policy_schema": "PUBLIC",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('ACCOUNTADMIN') then val\n    ELSE REGEXP_REPLACE(VAL,'.+\\@','*****@')\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "PHONE_MASK",
            "policy_schema": "PUBLIC",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "case\n    when current_role() in ('ACCOUNTADMIN') then val\n    else regexp_replace(VAL,'(.*)(\\\\d{4}$)','******\\\\2')\n  end",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "policy_name": "MASK_EMAIL",
            "policy_schema": "WA",
            "policy_catalog": "COST_MANAGEMENT_SYSTEM",
            "policy_signature": "{\"arguments\":[{\"identifier\":\"VAL\",\"datatype\":{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}}]}",
            "policy_return_type": "{\"type\":\"TEXT\",\"length\":16777216,\"byteLength\":16777216,\"nullable\":true,\"fixed\":false}",
            "policy_body": "CASE\n  WHEN EXISTS (SELECT ROLE FROM DATA_MASKING_ENTITLEMENT WHERE MASK_METHOD='UNMASK' AND ROLE = CURRENT_ROLE()) THEN VAL\n  ELSE REGEXP_REPLACE(VAL,'.+\\@','*****@')\nEND",
            "owner_role_type": "ROLE",
            "created_datetime": "2025-03-07 06:36:47"
        }
    ]
    const databaseInfoData = [
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "CMS_DATA",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 0,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"CMS_DATA\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-05-23 03:48:09",
            "last_altered": "2022-05-23 03:48:09",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "MYDB",
            "database_owner": "PUBLIC",
            "is_transient": false,
            "schema_count": 2,
            "table_count": 6,
            "view_count": 1,
            "sp_count": 1,
            "fn_count": 0,
            "schemas": [
                "MY_SCHEMA",
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"APPLYBUDGET\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"CREATE DATABASE ROLE\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"CREATE SCHEMA\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"MONITOR\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"MODIFY\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"PUBLIC\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"MYDB\", \"grantee_name\": \"TAG_ADMIN\"}"
            ],
            "created": "2024-02-14 09:39:37",
            "last_altered": "2025-02-19 09:52:58",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "CLASSIFY",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 1,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"CLASSIFY\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-09-22 10:31:21",
            "last_altered": "2022-09-22 10:31:21",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "AURIFY",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 6,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"AURIFY\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-06-14 07:50:08",
            "last_altered": "2022-06-14 07:50:08",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DEV_RAW",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 2,
            "table_count": 8,
            "view_count": 0,
            "sp_count": 3,
            "fn_count": 2,
            "schemas": [
                "PUBLIC",
                "ACCESS_LOGS"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_RAW\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-02-03 18:58:44",
            "last_altered": "2022-02-03 18:58:44",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DEV_STAGE",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 1,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_STAGE\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-02-03 19:01:56",
            "last_altered": "2022-02-03 19:01:56",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DATAGEIR",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 2,
            "table_count": 1,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC",
                "ACCOUNT_USAGE"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DATAGEIR\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-07-19 10:46:28",
            "last_altered": "2022-07-19 10:46:28",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "VIPUL_TEST",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 1,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"VIPUL_TEST\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-09-05 10:35:02",
            "last_altered": "2022-09-05 10:35:02",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DEV_GOLD",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 1,
            "view_count": 0,
            "sp_count": 1,
            "fn_count": 0,
            "schemas": [
                "PUBLIC"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_GOLD\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-02-03 19:02:21",
            "last_altered": "2022-02-03 19:02:21",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DEV_OPS",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 4,
            "table_count": 8,
            "view_count": 0,
            "sp_count": 16,
            "fn_count": 3,
            "schemas": [
                "PUBLIC",
                "AUDIT",
                "JOB",
                "CNTRL"
            ],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_OPS\", \"grantee_name\": \"ACCOUNTADMIN\"}",
                "{\"privilege\": \"MODIFY\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_OPS\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"DEV_OPS\", \"grantee_name\": \"MIGRATION_DEV\"}"
            ],
            "created": "2022-02-03 19:02:09",
            "last_altered": "2022-02-03 19:02:09",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "SFADF_DB",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 3,
            "table_count": 31,
            "view_count": 16,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"ACCOUNTADMIN\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"MIDDLE_CLASS_ROLE\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"POVERTY_ROLE\"}",
                "{\"privilege\": \"CREATE SCHEMA\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"SFADF_ROLE\"}",
                "{\"privilege\": \"MODIFY\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"SFADF_ROLE\"}",
                "{\"privilege\": \"REFERENCE_USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"SFADF_ROLE\"}",
                "{\"privilege\": \"MONITOR\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"SFADF_ROLE\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"SFADF_ROLE\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"UPPER_CLASS_ROLE\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"SFADF_DB\", \"grantee_name\": \"WORKING_CLASS_ROLE\"}"
            ],
            "created": "2022-09-26 11:37:55",
            "last_altered": "2022-09-26 11:37:55",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "DIABETES_DATASET",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 1,
            "table_count": 2,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"DIABETES_DATASET\", \"grantee_name\": \"ACCOUNTADMIN\"}"
            ],
            "created": "2022-06-21 04:53:55",
            "last_altered": "2022-06-21 04:53:55",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "COST_MANAGEMENT_SYSTEM",
            "database_owner": "ACCOUNTADMIN",
            "is_transient": false,
            "schema_count": 8,
            "table_count": 97,
            "view_count": 8,
            "sp_count": 3,
            "fn_count": 1,
            "schemas": [],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"ACCOUNTADMIN\"}",
                "{\"privilege\": \"MONITOR\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"CREATE SCHEMA\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"APPLYBUDGET\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"MODIFY\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"CREATE DATABASE ROLE\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}",
                "{\"privilege\": \"USAGE\", \"granted_on\": \"DATABASE\", \"name\": \"COST_MANAGEMENT_SYSTEM\", \"grantee_name\": \"MIGRATION_DEV\"}"
            ],
            "created": "2022-03-30 07:28:17",
            "last_altered": "2022-03-30 07:28:17",
            "created_datetime": "2025-03-07 06:36:47"
        },
        {
            "account_id": "NT38835",
            "version": 124,
            "database_name": "VS_DB",
            "database_owner": "VS_ROLE",
            "is_transient": false,
            "schema_count": 2,
            "table_count": 3,
            "view_count": 0,
            "sp_count": 0,
            "fn_count": 0,
            "schemas": [],
            "role_grants": [
                "{\"privilege\": \"OWNERSHIP\", \"granted_on\": \"DATABASE\", \"name\": \"VS_DB\", \"grantee_name\": \"VS_ROLE\"}"
            ],
            "created": "2023-10-09 15:18:41",
            "last_altered": "2023-10-09 15:18:41",
            "created_datetime": "2025-03-07 06:36:47"
        }
    ]

    let state = useSelector((state) => state)
    console.log(state);



    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isFormValid = Object.values(formData).every(value => value.trim() !== '');

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
        await dispatch(postAccountLevelData(formData)).unwrap();
    };

    const fetchAllTables = async (account_id) => {
        const actions = [
            { action: rolesTable, name: 'Roles Table' },
            { action: usersTable, name: 'Users Table' },
            { action: accountInfoTable, name: 'Account Info' },
            { action: computeInfoTable, name: 'Compute Info' },
            { action: maskingPolicies, name: 'Masking Policies' },
            { action: databaseInfoTable, name: 'Database Info' },
        ];

        for (const { action, name } of actions) {
            try {
                await dispatch(action({ account_id })).unwrap();

            } catch (error) {
                message.warning(`Some data (${name}) could not be loaded.`);
            }
        }
    };

    const onPageChange = async (page) => {
        const account_id = formData?.SNOWFLAKE_ACCOUNT?.split('.')[0];
        setCurrentPage(page);
        try {
            await dispatch(rolesTable({ account_id, pageNo: page })).unwrap();
        } catch (error) {
            message.error(`Failed to fetch page ${page}`);
        }
    };

    const formatText = (text) => {
        if (typeof text !== 'string') return '';
        return text
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const tabsData = {
        account_info: {
            columns: [
                { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
                { title: 'Region', dataIndex: 'region', key: 'region', width: 150 },
                { title: 'Created Datetime', dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
            ],
            data: accountInfo?.map((info, index) => ({
                key: index,
                version: info.version,
                region: formatText(info.region) || 'NA',
                created_datetime: info.created_datetime || 'NA',
            })) || [],
        },
        compute_info: {
            columns: [
                { title: `${LABELS.ACCOUNT_TEXT_VERSION}`, dataIndex: 'version', key: 'version', width: 100 },
                { title: `${LABELS.ACCOUNT_TEXT_WAREHOUSE_NAME}`, dataIndex: 'warehouse_name', key: 'warehouse_name', width: 200, ellipsis: true },
                { title: `${LABELS.ACCOUNT_TEXT_SIZE}`, dataIndex: 'size', key: 'size', width: 100 },
                { title: `${LABELS.ACCOUNT_TEXT_MIN_CLUSTER_COUNT}`, dataIndex: 'min_cluster_count', key: 'min_cluster_count', width: 150 },
                { title: `${LABELS.ACCOUNT_TEXT_MAX_CLUSTER_COUNT}`, dataIndex: 'max_cluster_count', key: 'max_cluster_count', width: 150 },
                { title: `${LABELS.ACCOUNT_TEXT_TYPE}`, dataIndex: 'type', key: 'type', width: 100 },
                { title: `${LABELS.ACCOUNT_TEXT_SCALING_POLICY}`, dataIndex: 'scaling_policy', key: 'scaling_policy', width: 150 },
                { title: `${LABELS.ACCOUNT_TEXT_TOTAL_CREDITS_LAST_90_DAYS}`, dataIndex: 'total_credits_last_90_days', key: 'total_credits_last_90_days', width: 200 },
                { title: `${LABELS.ACCOUNT_TEXT_AVERAGE_DAILY_CREDITS}`, dataIndex: 'average_daily_credits', key: 'average_daily_credits', width: 200 },
                { title: `${LABELS.ACCOUNT_TEXT_CREATED_DATETIME}`, dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
            ],

            data: computeInfo?.map((info, index) => ({
                key: index,
                version: info.version,
                warehouse_name: formatText(info.warehouse_name) || 'NA',
                size: info.size || 'NA',
                min_cluster_count: info.min_cluster_count || 'NA',
                max_cluster_count: info.max_cluster_count || 'NA',
                type: info.type || 'NA',
                scaling_policy: info.scaling_policy || 'NA',
                total_credits_last_90_days: info.total_credits_last_90_days || 0,
                average_daily_credits: info.average_daily_credits || 0,
                created_datetime: info.created_datetime || 'NA',
            })) || [],
        },
        roles: {
            columns: [
                { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
                { title: 'Role Name', dataIndex: 'name', key: 'name', width: 150, ellipsis: true },
                { title: 'Comment', dataIndex: 'comment', key: 'comment', width: 200, ellipsis: true },
                { title: 'Created On', dataIndex: 'created_on', key: 'created_on', width: 150 },
                { title: 'Is Default', dataIndex: 'is_default', key: 'is_default', width: 120 },
                { title: 'Is Current', dataIndex: 'is_current', key: 'is_current', width: 120 },
                { title: 'Is Inherited', dataIndex: 'is_inherited', key: 'is_inherited', width: 120 },
                { title: 'Assigned Users', dataIndex: 'assigned_to_users', key: 'assigned_to_users', width: 200, ellipsis: true },
                { title: 'Granted To Roles', dataIndex: 'granted_to_roles', key: 'granted_to_roles', width: 200, ellipsis: true },
                { title: 'Granted Roles', dataIndex: 'granted_roles', key: 'granted_roles', width: 200, ellipsis: true },
                { title: 'Created Datetime', dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
            ],
            data: roleTable?.map((role, index) => ({
                key: index,
                version: role.version,
                name: formatText(role.name) || 'NA',
                comment: formatText(role.comment) || 'NA',
                created_on: role.created_on || 'NA',
                is_default: role.is_default !== undefined ? (role.is_default ? 'True' : 'False') : 'NA',
                is_current: role.is_current !== undefined ? (role.is_current ? 'True' : 'False') : 'NA',
                is_inherited: role.is_inherited !== undefined ? (role.is_inherited ? 'True' : 'False') : 'NA',
                assigned_to_users: formatText(Array.isArray(role.assigned_to_users) ? role.assigned_to_users.join(', ') : role.assigned_to_users) || 0,
                granted_to_roles: formatText(Array.isArray(role.granted_to_roles) ? role.granted_to_roles.join(', ') : role.granted_to_roles) || 0,
                granted_roles: formatText(Array.isArray(role.granted_roles) ? role.granted_roles.join(', ') : role.granted_roles) || 0,
                created_datetime: role.created_datetime || 'NA',
            })) || [],
            pagination: {
                pageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20']
            }
        },
        users: {
            columns: [
                { title: 'Version', dataIndex: 'version', key: 'version', width: 60 },
                { title: 'User Name', dataIndex: 'name', key: 'name', width: 120 },
                { title: 'Owner', dataIndex: 'owner', key: 'owner', width: 120 },
                { title: 'Roles', dataIndex: 'roles', key: 'roles', width: 200, ellipsis: true },
                { title: 'Created On', dataIndex: 'created_on', key: 'created_on', width: 120 },
                { title: 'Last Success Login', dataIndex: 'last_success_login', key: 'last_success_login', width: 150 },
                { title: 'Created Datetime', dataIndex: 'created_datetime', key: 'created_datetime', width: 150 }
            ],

            data: userTable?.map((user, index) => ({
                key: index,
                version: user.version,
                name: formatText(user.name) || 'NA',
                owner: formatText(user.owner) || 'NA',
                roles: formatText(Array.isArray(user.roles) ? user.roles.join(', ') : user.roles) || 'NA',
                created_on: user.created_on || 'NA',
                last_success_login: user.last_success_login || 'NA',
                created_datetime: user.created_datetime || 'NA',
            })) || [],
        },
        masking_policies: {
            columns: [
                { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
                { title: 'Policy Name', dataIndex: 'policy_name', key: 'policy_name', width: 200, ellipsis: true },
                { title: 'Policy Schema', dataIndex: 'policy_schema', key: 'policy_schema', width: 150 },
                { title: 'Policy Catalog', dataIndex: 'policy_catalog', key: 'policy_catalog', width: 150 },
                { title: 'Policy Signature', dataIndex: 'policy_signature', key: 'policy_signature', width: 250, ellipsis: true },
                { title: 'Policy Return Type', dataIndex: 'policy_return_type', key: 'policy_return_type', width: 150, ellipsis: true },
                { title: 'Policy Body', dataIndex: 'policy_body', key: 'policy_body', width: 300, ellipsis: true },
                { title: 'Owner Role Type', dataIndex: 'owner_role_type', key: 'owner_role_type', width: 150 },
                { title: 'Created Datetime', dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
            ],
            data: maskingPoliciesData?.map((info, index) => ({
                key: index,
                version: info.version,
                policy_name: formatText(info.policy_name) || 'NA',
                policy_schema: formatText(info.policy_schema) || 'NA',
                policy_catalog: formatText(info.policy_catalog) || 'NA',
                policy_signature: formatText(info.policy_signature) || 'NA',
                policy_return_type: formatText(info.policy_return_type) || 'NA',
                policy_body: formatText(info.policy_body) || 'NA',
                owner_role_type: formatText(info.owner_role_type) || 'NA',
                created_datetime: info.created_datetime || 'NA',
            })) || [],
        },
        database_info: {
            columns: [
                { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
                { title: 'Database Name', dataIndex: 'database_name', key: 'database_name', width: 200, ellipsis: true },
                { title: 'Database Owner', dataIndex: 'database_owner', key: 'database_owner', width: 200 },
                { title: 'Is Transient', dataIndex: 'is_transient', key: 'is_transient', width: 120 },
                { title: 'Schema Count', dataIndex: 'schema_count', key: 'schema_count', width: 120 },
                { title: 'Table Count', dataIndex: 'table_count', key: 'table_count', width: 120 },
                { title: 'View Count', dataIndex: 'view_count', key: 'view_count', width: 120 },
                { title: 'SP Count', dataIndex: 'sp_count', key: 'sp_count', width: 120 },
                { title: 'FN Count', dataIndex: 'fn_count', key: 'fn_count', width: 120 },
                { title: 'Schemas', dataIndex: 'schemas', key: 'schemas', width: 180, ellipsis: true },
                { title: 'Role Grants', dataIndex: 'role_grants', key: 'role_grants', width: 250, ellipsis: true },
                { title: 'Created', dataIndex: 'created', key: 'created', width: 180 },
                { title: 'Last Altered', dataIndex: 'last_altered', key: 'last_altered', width: 180 },
                { title: 'Created Datetime', dataIndex: 'created_datetime', key: 'created_datetime', width: 180 }
            ],
            data: databaseInfoData?.map((info, index) => ({
                key: index,
                version: info.version,
                database_name: formatText(info.database_name) || 'NA',
                database_owner: formatText(info.database_owner) || 'NA',
                is_transient: info.is_transient ? 'Yes' : 'No',
                schema_count: info.schema_count || 0,
                table_count: info.table_count || 0,
                view_count: info.view_count || 0,
                sp_count: info.sp_count || 0,
                fn_count: info.fn_count || 0,
                schemas: formatText(Array.isArray(info.schemas) ? info.schemas.join(', ') : info.schemas) || 'NA',
                role_grants: formatText(Array.isArray(info.role_grants) ? info.role_grants.join(', ') : info.role_grants) || 'NA',
                created: info.created || 'NA',
                last_altered: info.last_altered || 'NA',
                created_datetime: info.created_datetime || 'NA',
            })) || [],
        },

    };
    const formatTabKey = (key) => {
        return key
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const tabKeys = Object.keys(tabsData);
    const formattedTabs = tabKeys.map(formatTabKey);

    return (
        <>
            <MigrationCard
                title="Account Level Configuration"
                description="Enter your Snowflake and BigQuery details to start the migration process."
                labelLeft="Snowflake Account"
                valueLeft={formData.SNOWFLAKE_ACCOUNT}
                onChangeLeft={(value) => handleInputChange('SNOWFLAKE_ACCOUNT', value)}
                placeholderLeft="Enter Snowflake Account"
                labelRight="BigQuery Project"
                valueRight={formData.BIGQUERY_PROJECT}
                onChangeRight={(value) => handleInputChange('BIGQUERY_PROJECT', value)}
                placeholderRight="Enter BigQuery Project"
                buttonText="Start Crawler"
                loading={loading}
                onSubmit={handleSubmit}
                isFormValid={isFormValid}
            />
            {/* <Card bordered className="account-level-card">
        <Title level={3} className="account-level-title">{LABELS.ACCOUNT_TEXT_ACCOUNT_LEVEL_CONFIGURATION}</Title>
        <Text type="secondary" className="account-level-description">
          {LABELS.ACCOUNT_TEXT_SUB_HEADING}
        </Text>
        <Row gutter={[16, 16]} align="middle" className="form-row">
          <Col xs={10} sm={7} className="input-col">
            <label className="input-label">{LABELS.ACCOUNT_TEXT_SNOWFLAKE_ACCOUNT}</label>
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
            <label className="input-label">{LABELS.ACCOUNT_TEXT_BIGQUERY_PROJECT}</label>
            <Input
              placeholder="Enter BigQuery Project"
              value={formData.BIGQUERY_PROJECT}
              onChange={(e) => handleInputChange('BIGQUERY_PROJECT', e.target.value)}
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

            {/* <Loader/> */}
            {/* {crawlerComplete && ( */}
            <>
                <CustomTabs
                    tabs={formattedTabs}
                    selectedTab={activeTab}
                    setSelectedTab={(index, key) => {
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
                            setCurrentPage(page);
                            onPageChange(page);
                        }
                    } : false}
                />

            </>

            {/* )} */}


        </>
    );
};

export default AccountLevel;
