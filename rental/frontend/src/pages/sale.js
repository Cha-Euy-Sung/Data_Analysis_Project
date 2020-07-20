import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Descriptions, Progress, Table, Tag, Card, Steps, Divider } from "antd";
import axios from "axios";
import { withRouter } from "react-router";

const { Step } = Steps;

const Wrapper = styled.div``;

const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding: 50px;
  .ant-descriptions-title {
    font-size: 20px;
  }
`;

const CancelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
`;

const CancelProp = styled.div`
  .ant-progress-inner {
    width: 180px !important;
    height: 180px !important;
  }
  padding-bottom: 50px;
`;

const Strategy = styled.div`
  /* display: flex;
  justify-content: center; */
  .ant-card {
    margin-right: 30px;
  }
  .ant-card-head-title {
    font-weight: 800;
  }
  .ant-steps-item-content {
    text-align: start !important;
  }
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const present = ["웅진플레이도시 입장권 증정", "웅진식품 기프티콘 증정"];

const Member = ({
  match: {
    params: { saleId }
  }
}) => {
  const [sale, setSale] = useState();
  const [lifePercent, setLifePercent] = useState();

  useEffect(() => {
    if (!sale) {
      getSale();
    }
  });

  const today = new Date("08-06-2017");

  const calcDate = month => {
    let stdDate = new Date(today);
    stdDate.setMonth(stdDate.getMonth() + month);

    return stdDate;
  };

  const getSale = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/sales/${saleId}`);
      // console.log(data);
      setSale(data);
      console.log(data);
      setLifePercent((75 / data.contract_period) * 30);
      // setMember(data);
    } catch (e) {
      console.log(e);
    }
  };

  return sale ? (
    <Wrapper>
      <Container>
        <Descriptions title="계약 정보">
          <Descriptions.Item label="판매유형">
            {sale.sales_type}
          </Descriptions.Item>
          <Descriptions.Item label="계약유형">
            {sale.contract_type}
          </Descriptions.Item>
          <Descriptions.Item label="유통경로">
            {sale.distribution_channel}
          </Descriptions.Item>
          <Descriptions.Item label="계약일">
            {new Date(sale.contract_date).toISOString().split("T")[0]}
          </Descriptions.Item>
          <Descriptions.Item label="계약기간">
            {sale.contract_period}
          </Descriptions.Item>
          <Descriptions.Item label="월렌탈비용">
            {parseInt(sale.rental_cost).toLocaleString() + "원"}
          </Descriptions.Item>
          <Descriptions.Item label="해약 여부">
            <span>
              <Tag
                color={sale.canceled == "해약" ? "volcano" : "green"}
                key={sale.canceled}
              >
                {sale.canceled}
              </Tag>
            </span>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {sale.canceled == "해약" ? null : (
          <CancelContainer>
            <CancelProp>
              <Title>추정 잔존 기간</Title>
              <Progress
                strokeColor="#ffa39e"
                type="circle"
                percent={40}
                format={percent => `75 Days`}
              />
            </CancelProp>
            <Strategy>
              <Title>
                서비스 전략<small>Today: 2017-08-06</small>
              </Title>
              <Steps current={1} direction="vertical">
                <Step
                  title={
                    calcDate(-4)
                      .toISOString()
                      .split("T")[0]
                  }
                  description="사용 경험에 대한 만족도 및 불편사항 조사"
                />
                <Step
                  title={
                    calcDate(-1)
                      .toISOString()
                      .split("T")[0]
                  }
                  description="기존 데이터 및 불편사항 조사 결과 기반 맞춤형 정책(COWIP) 추천"
                />
                <Step
                  title={
                    calcDate(2)
                      .toISOString()
                      .split("T")[0]
                  }
                  description={
                    parseInt(sale.customer_age) > 30 ? present[1] : present[0]
                  }
                />
                {console.log(parseInt(sale.customer_age))}
              </Steps>
            </Strategy>
          </CancelContainer>
        )}
      </Container>
    </Wrapper>
  ) : null;
};

export default withRouter(Member);
