import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SnowflakeLogo from '../assets/snowflake_logo.jpg';
import BigQueryLogo from '../assets/bigquery_logo.png';

const Loader = () => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(2);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.container}>
            {step === 1 ? (
                <motion.img
                    src={SnowflakeLogo}
                    alt="Snowflake Logo"
                    style={styles.logo}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                    key="snowflake"
                />
            ) : (
                <motion.img
                    src={BigQueryLogo}
                    alt="BigQuery Logo"
                    style={styles.logo}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    key="bigquery"
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
    },
};

export default Loader;
