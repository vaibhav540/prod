import React from 'react';
import { Card, Typography, Row, Col, Input, Button } from 'antd';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MigrationCard = ({
    title,
    description,
    labelLeft,
    valueLeft,
    onChangeLeft,
    placeholderLeft,
    labelRight,
    valueRight,
    onChangeRight,
    placeholderRight,
    buttonText,
    loading,
    onSubmit,
    isFormValid,
}) => {
    return (
        <Card bordered className="migration-card">
            <Title level={3} className="migration-title">{title}</Title>
            <Text type="secondary" className="migration-description">
                {description}
            </Text>
            <Row gutter={[16, 16]} align="middle" className="form-row">
                <Col xs={10} sm={7} className="input-col">
                    <label className="input-label">{labelLeft}</label>
                    <Input
                        placeholder={placeholderLeft}
                        value={valueLeft}
                        onChange={(e) => onChangeLeft(e.target.value)}
                        disabled={loading}
                    />
                </Col>
                <Col xs={2} className="arrow-col">
                    <FaLongArrowAltRight />
                </Col>
                <Col xs={10} sm={7} className="input-col">
                    <label className="input-label">{labelRight}</label>
                    <Input
                        placeholder={placeholderRight}
                        value={valueRight}
                        onChange={(e) => onChangeRight(e.target.value)}
                        disabled={loading}
                    />
                </Col>
                <Col xs={20} sm={8} className="input-col button-col">
                    <Button
                        className="background-primary bold-text"
                        loading={loading}
                        size="large"
                        onClick={onSubmit}
                        disabled={!isFormValid || loading}
                        block
                    >
                        {loading ? 'Starting Crawler...' : buttonText}
                    </Button>

                </Col>
            </Row>
        </Card>
    );
};

export default MigrationCard;
