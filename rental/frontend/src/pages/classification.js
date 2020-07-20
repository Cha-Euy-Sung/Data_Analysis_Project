import React, { useState } from "react";
import {
  Progress,
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Icon,
  message,
  Radio,
  Card,
  Select,
  notification,
  Divider
} from "antd";
import styled from "styled-components";
import axios from "axios";

const { Option } = Select;

const openNotificationWithIcon = type => {
  notification[type]({
    message: `해약 가능성 예측을 위해 모든 항목을 선택해주세요!`
    // description:
    //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

const Container = styled.div`
  padding: 50px 0;
`;

const TopContainer = styled.div`
  .ant-row {
    width: 900px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid grey;
    border-radius: 4px;
  }
`;

const BottomContainer = styled.div`
  .ant-row {
    margin: 0 auto;
    min-width: 920px;
    padding: 20px;
    /* border: 1px solid grey; */
    /* border-radius: 4px; */
  }
  display: flex;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 20px;
`;

const CancelProp = styled.div`
  .ant-progress-inner {
    width: 180px !important;
    height: 180px !important;
  }
  margin-bottom: 40px;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 100px;

  margin-bottom: 30px;
`;

const RowTitle = styled.h3`
  font-size: 15px;
  font-weight: 800;
`;

const Strategies = styled.div`
  display: flex;
  justify-content: space-evenly;
  p {
    font-size: 18px;
  }
  .ant-card-head-title {
    font-size: 18px;
    font-weight: 800;
  }
`;

export default () => {
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState();
  const [salesType, setSalesType] = useState();
  const [contractType, setContractType] = useState();
  // const [creditRating, setCreditRating] = useState(4);
  const [province, setProvince] = useState();
  const [age, setAge] = useState();
  const [paymentType, setPaymentType] = useState();
  const [prob, setProb] = useState();

  const handleChange = (column, value) => {
    console.log(column, value);

    if (column == "gender") {
      setGender(value);
    } else if (column == "sales_type") {
      setSalesType(value);
    } else if (column == "contract_type") {
      setContractType(value);
    } else if (column == "age") {
      setAge(value);
    } else if (column == "province") {
      setProvince(value);
    } else if (column == "payment_type") {
      setPaymentType(value);
    }
  };

  return (
    <Container>
      <TopContainer>
        <Row>
          <Col span={12}>
            <RowContainer>
              <RowTitle>성별</RowTitle>
              <Radio.Group
                onChange={e => handleChange("gender", e.target.value)}
              >
                <Radio value="남자">남자</Radio>
                <Radio value="여자">여자</Radio>
              </Radio.Group>
            </RowContainer>
            <RowContainer>
              <RowTitle>계약유형</RowTitle>
              <Select
                placeholder="계약유형"
                style={{ width: 200 }}
                onChange={value => handleChange("contract_type", value)}
              >
                <Option value="일반">일반</Option>
                <Option value="교체렌탈">교체렌탈</Option>
                <Option value="프로모션">프로모션</Option>
                <Option value="멤버십S">멤버십S</Option>
                <Option value="통합 패키지">통합 패키지</Option>
                <Option value="멤버십A">멤버십A</Option>
                <Option value="멤버십B">멤버십B</Option>
                <Option value="멤버십C">멤버십C</Option>
              </Select>
            </RowContainer>
            <RowContainer>
              <RowTitle>연령대</RowTitle>
              <Select
                placeholder="연령대"
                style={{ width: 200 }}
                onChange={value => handleChange("age", value)}
              >
                <Option value="10">10</Option>
                <Option value="20">20</Option>
                <Option value="30">30</Option>
                <Option value="40">40</Option>
                <Option value="50">50</Option>
                <Option value="60">60</Option>
                <Option value="70">70</Option>
                <Option value="80">80</Option>
                <Option value="90">90</Option>
              </Select>
            </RowContainer>
          </Col>
          <Col span={12}>
            <RowContainer>
              <RowTitle>판매유형</RowTitle>
              <Radio.Group
                onChange={e => handleChange("sales_type", e.target.value)}
              >
                <Radio value="렌탈">렌탈</Radio>
                <Radio value="멤버십">멤버십</Radio>
              </Radio.Group>
            </RowContainer>
            <RowContainer>
              <RowTitle>거주지</RowTitle>
              <Select
                placeholder="거주지"
                style={{ width: 200 }}
                onChange={value => handleChange("province", value)}
              >
                <Option value="서울특별시">서울특별시</Option>
                <Option value="경기도">경기도</Option>
                <Option value="충청도">충청도</Option>
                <Option value="강원도">강원도</Option>
                <Option value="경상도">경상도</Option>
                <Option value="전라도">전라도</Option>
                <Option value="제주도">제주도</Option>
              </Select>
            </RowContainer>
            <RowContainer>
              <RowTitle>납부유형</RowTitle>
              <Select
                placeholder="납부유형"
                style={{ width: 200 }}
                onChange={value => handleChange("payment_type", value)}
              >
                <Option value="CMS">CMS</Option>
                <Option value="카드이체">카드이체</Option>
                <Option value="무통장">무통장</Option>
                <Option value="가상계좌">가상계좌</Option>
              </Select>
            </RowContainer>
          </Col>
          <ButtonWrapper>
            <Button
              onClick={async e => {
                if (
                  gender &&
                  salesType &&
                  contractType &&
                  age &&
                  province &&
                  paymentType
                ) {
                  setShow(true);
                  const res = await axios.get("http://localhost:8000/predict", {
                    params: {
                      gender,
                      sales_type: salesType,
                      contract_type: contractType,
                      age,
                      province,
                      payment_type: paymentType
                    }
                  });
                  setProb(res.data);
                  console.log(typeof res.data);
                } else {
                  openNotificationWithIcon("warning");
                }
              }}
              className="submit-btn"
              icon="eye"
              type="primary"
            >
              해약 가능성 예측
            </Button>
          </ButtonWrapper>
        </Row>
      </TopContainer>
      {show ? (
        <>
          <BottomContainer>
            <Row>
              <Divider />
              <CancelProp>
                <Title>해약 가능성</Title>
                <Progress
                  type="circle"
                  percent={prob}
                  strokeColor={prob > 50 ? "#ff4d4f" : "#40a9ff"}
                />
              </CancelProp>
              <Strategies>
                <Card title="추천 정책" style={{ width: 700 }}>
                  <p>
                    계약기간 <strong>{prob > 50 ? "12" : "60"}개월</strong>
                  </p>
                  <p>
                    월렌탈비용{" "}
                    <strong>{prob > 50 ? "96,900" : "66,900"}원</strong>
                  </p>
                  <p>정책을 추천합니다.</p>
                </Card>
              </Strategies>
            </Row>
          </BottomContainer>
        </>
      ) : null}
    </Container>
  );
};
