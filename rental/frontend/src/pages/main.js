import React from "react";
import styled from "styled-components";
import { Carousel } from "antd";

const Container = styled.div`
  padding-top: 100px;
  .ant-carousel .slick-slide {
    text-align: center;
    width: 100%;
    height: 100%;

    line-height: 160px;
    /* background: #364d79; */
    overflow: hidden;
  }
`;

const BgImg = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center center;
  filter: grayscale(70%);
  -webkit-filter: grayscale(70%);

  -moz-filter: grayscale(70%);

  -o-filter: grayscale(70%);
  width: 1920px;
  height: 430px;
`;

export default () => {
  return (
    <Container>
      <Carousel autoplay autoplaySpeed={2800} speed={1500}>
        {/* <BgImg url="http://localhost:3000/water1.jpg" />
        <BgImg url="http://localhost:3000/water2.jpg" />
        <BgImg url="http://localhost:3000/water3.jpg" /> */}

        {/* <BgImg url="http://localhost:3000/aircare.png" />
        <BgImg url="http://localhost:3000/bodycare.png" />
        <BgImg url="http://localhost:3000/watercare.png" /> */}

        <BgImg url="http://localhost:3000/water.png" />
        <BgImg url="http://localhost:3000/water4.jpg" />
        <BgImg url="http://localhost:3000/water7.jpg" />
      </Carousel>
    </Container>
  );
};
