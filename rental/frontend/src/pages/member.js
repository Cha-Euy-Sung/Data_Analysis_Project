import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Descriptions, Progress, Table, Tag } from "antd";
import axios from "axios";
import { withRouter } from "react-router";

const Wrapper = styled.div``;

const Container = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding: 50px;
  .ant-descriptions-title {
    font-size: 20px;
  }
`;

const CancelProp = styled.div`
  padding-top: 100px;

  .ant-progress-inner {
    width: 180px !important;
    height: 180px !important;
  }
`;

const ItemsInfo = styled.div`
  padding-top: 50px;
  span.ant-tag {
    margin-right: 0 !important;
    font-size: 14px;
  }
  .ant-table-tbody .ant-table-row {
    cursor: pointer;
  }
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 20px;
`;

const columns = [
  {
    title: "판매유형",
    dataIndex: "sales_type",
    key: "sales_type",
    align: "center"
  },
  {
    title: "계약유형",
    dataIndex: "contract_type",
    key: "contract_type",
    align: "center"
  },
  {
    title: "유통경로",
    dataIndex: "distribution_channel",
    key: "distribution_channel",
    align: "center"
  },
  {
    title: "계약일",
    dataIndex: "contract_date",
    key: "contract_date",
    align: "center",
    render: date => new Date(date).toISOString().split("T")[0]
  },
  {
    title: "계약기간",
    dataIndex: "contract_period",
    key: "contract_period",
    align: "center"
  },
  {
    title: "월렌탈비용",
    dataIndex: "rental_cost",
    key: "rental_cost",
    align: "center"
  },
  {
    title: "해약여부",
    key: "canceled",
    dataIndex: "canceled",
    align: "center",
    render: tag => (
      <span>
        <Tag color={tag == "해약" ? "volcano" : "green"} key={tag}>
          {tag}
        </Tag>
      </span>
    )
  }
];

const Member = ({
  history,
  match: {
    params: { memberId }
  }
}) => {
  const [member, setMember] = useState();

  useEffect(() => {
    if (!member) {
      getMember();
    }
  });

  const getMember = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/members/${memberId}`
      );
      data.all_sales = JSON.parse(data.all_sales);
      // console.log(data);
      setMember(data);
      // setMember(data);
    } catch (e) {
      console.log(e);
    }
  };

  return member ? (
    <Wrapper>
      <Container>
        <Descriptions title="고객 정보">
          <Descriptions.Item label="고객 ID">
            {member.customer_id}
          </Descriptions.Item>
          <Descriptions.Item label="고객 유형">
            {member.customer_type}
          </Descriptions.Item>
          <Descriptions.Item label="생년">
            {member.birth_year}
          </Descriptions.Item>
          <Descriptions.Item label="성별">{member.gender}</Descriptions.Item>
          <Descriptions.Item label="거주지">
            {member.province}
          </Descriptions.Item>
        </Descriptions>
        <ItemsInfo>
          <Title>전체 계약 정보</Title>
          {console.log(member.all_sales)}
          <Table
            rowKey="id"
            columns={columns}
            dataSource={member.all_sales}
            pagination={false}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  console.log(record);
                  // const pathname = new URL(record.url).pathname;
                  history.push(`/sales/${record.id}`);
                }
              };
            }}
          />
        </ItemsInfo>
      </Container>
    </Wrapper>
  ) : null;
};

export default withRouter(Member);
