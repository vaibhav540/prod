import bg1 from "../assets/bg1.webp";
import bg2 from "../assets/bg2.webp";
import React, { useState } from "react";
import { Button, Typography, Row, Col, Modal } from "antd";
import Login from "./Login"; // Make sure path is correct

const { Title, Text } = Typography;

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
        <Text style={styles.brand}>Migration Tool</Text>
      </div>

      <Row justify="center" align="middle">
        {/* Left Content Section */}
        <Col xs={24} md={12} style={styles.textSection}>
          <Title level={2} style={styles.heading}>
            Seamless Data Migration from Snowflake to BigQuery
          </Title>
          <Text style={styles.subText}>
            Our automated migration tool ensures a fast, secure, and efficient transition 
            of your data with minimal downtime.
          </Text>
          <br />
          <Button type="primary" size="large" style={styles.button} onClick={showModal}>
            Start Migration
          </Button>
          <br />
          <Text style={styles.quote}>
            Optimize performance, reduce costs, and unlock new analytics possibilities 
            by migrating your data effortlessly.
          </Text>
        </Col>

        {/* Right Image Section */}
        <Col xs={24} md={12} style={styles.imageSection}>
          <div style={styles.imageContainer}>
            {/* <img src={bg1} alt="Data Migration" style={styles.image} /> */}
          </div>
        </Col>
      </Row>

      <Modal
   title={null}
   open={isModalVisible}
   onCancel={handleCancel}
   footer={null}
   width="90vw"
    bodyStyle={{
        height: "90vh",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",  // Added this to ensure blobs stay inside modal
        overflow: "hidden",
        borderRadius:"4px 4px 4px 4px ",

    }}
    style={{
    borderRadius:"4px 4px 4px 4px ",
      padding:0,
        top: 0,
        position: "relative", // Important to control blob positioning
    }}
    centered
>
    <div className="blob-left"></div>
    <div className="blob-right"></div>
    <Login isModal={true} onSuccess={handleCancel} redirectPath={location.state?.from}/>
</Modal>


    </div>
  );
};

// Keep all existing styles exactly the same
const styles = {
  container: {
    overflow: "hidden",
    backgroundColor: "#fae5df",
    minHeight: "100vh",
    height: "100vh",
    boxSizing: "border-box",
    padding: "5vw",
    textAlign: "left",
    fontFamily: "Arial, sans-serif",
  },
  imageContainer: {
    backgroundColor: "#f5cac2",
    padding: "20px",
    borderRadius: "60% 40% 60% 40%", 
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
    width: "100%",  
    height: "40vh",   // More responsive height
    backgroundImage: `url(${bg2})`,
    backgroundSize: "cover",   
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", 
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
  },
  brand: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ed7966",
  },
  navItem: {
    marginLeft: "20px",
    fontSize: "16px",
    color: "#303179",
    cursor: "pointer",
  },
  textSection: {
    padding: "20px",
  },
  heading: {
    color: "#303179",
    fontWeight: "bold",
  },
  subText: {
    color: "#ed7966",
    fontSize: "16px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#ed7966",
    borderColor: "#ed7966",
  },
  quote: {
    display: "block",
    marginTop: "20px",
    fontSize: "16px",
    color: "#303179",
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  imageContainer: {
    backgroundColor: "#f5cac2",
    padding: "20px",
    borderRadius: "60% 40% 60% 40%", 
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
    width: "100%",  
    height: "350px", 
    backgroundImage: `url(${bg2})`,
    backgroundSize: "cover",   
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", 
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
  }
};

export default HomePage;