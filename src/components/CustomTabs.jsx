import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

const CustomTabs = ({ tabs, selectedTab, setSelectedTab, tourClasses = [], classes = "" }) => {
  return (
    <Row className="custom-tabs-container">
      {tabs.map((tab, index) => (
        <Col
          key={index}
          className={`custom-tab 
            ${selectedTab === index + 1 ? "custom-tab-active" : ""} 
            ${index === 0 ? "custom-tab-left" : ""} 
            ${index === tabs.length - 1 ? "custom-tab-right" : ""} 
            ${tourClasses[index] || ""} 
            ${classes}`}
          onClick={() => setSelectedTab(index + 1)}
        >
          {tab}
        </Col>
      ))}
    </Row>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  tourClasses: PropTypes.array,
  classes: PropTypes.string,
};

export default CustomTabs;
