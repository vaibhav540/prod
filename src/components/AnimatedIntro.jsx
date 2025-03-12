import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import snowflakeLogo from "../assets/snowflake.png";
import bigQueryLogo from "../assets/bigquery.svg";
import "../styles/animatedIntro.css";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

const AnimatedIntro = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (showLogin) {
      navigate("/homepage");
    }
  }, [showLogin, navigate]);

  return (
    <div className="intro-container">
      {!showLogin && (
        <>
          <motion.img
            src={snowflakeLogo}
            alt="Snowflake Logo"
            className="logo snowflake"
            initial={{ x: "-100vw", rotate: 0, opacity: 0 }}
            animate={{ x: 0, rotate: 360, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.img
            src={bigQueryLogo}
            alt="BigQuery Logo"
            className="logo bigquery"
            initial={{ x: "100vw", rotate: 0, opacity: 0 }}
            animate={{ x: 0, rotate: -360, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => setShowLogin(true)}
          />

        </>
      )}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <HomePage />
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedIntro;
