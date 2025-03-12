import React, { useState } from 'react'
import CustomTabs from './CustomTabs';

const SecurityMigration = () => {
  const [activeTab, setActiveTab] = useState(1);

  const formattedTabs = [
      { key: 1, label: "Users" },
      { key: 2, label: "IAM Roles" },
      { key: 3, label: "User & Role Mapping" },
      { key: 4, label: "Database Level Role Grants" }
  ];

  return (
      <>
          <CustomTabs
              tabs={formattedTabs.map(tab => tab.label)} 
              selectedTab={activeTab}
              setSelectedTab={(index) => setActiveTab(index)}
          />
      </>
  );
};


export default SecurityMigration