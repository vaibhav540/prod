import React from "react";
import { Carousel, Image, Typography, Grid } from "antd";
import "../styles/animatedIntro.css";
import { LABELS } from "../constants/labels";
import gif1 from "../assets/gif/1.gif";
import gif2 from "../assets/gif/2.gif";
import gif3 from "../assets/gif/3.gif";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const MigrationCarousel = () => {
  const screens = useBreakpoint(); 

  return (
    <div style={{ width: "100%", maxWidth: "530px", margin: "auto" ,height: "200px"}}>
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        {[gif1, gif2, gif3].map((gif, index) => (
          <div key={index} className="carousel-slide">
            <div
              className="carousel-content"
              style={{
                display: "flex",
                flexDirection: screens.md ? "row" : "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                padding: "10px",
              }}
            >
              <div
                className="carousel-text-container"
                style={{
                  textAlign: screens.md ? "left" : "center",
                  maxWidth: "70%",
                }}
              >
                <Title level={5} className="carousel-title">
                  {LABELS[`LOGIN_TEXT_CAROUSEL_TITLE_${index + 1}`]}
                </Title>
                <Paragraph className="carousel-text">
                  {LABELS[`LOGIN_TEXT_CAROUSEL_DESCRIPTION_${index + 1}`]}
                </Paragraph>
              </div>

              <Image
                src={gif}
                preview={false}
                className="carousel-image"
                style={{
                  width: screens.sm ? "120px" : "110px",
                  height: screens.sm ? "130px" : "120px",
                }}
              />

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};


export default MigrationCarousel;
