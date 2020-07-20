import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Checkbox, Input } from "antd";
import styled from "styled-components";
import { withRouter } from "react-router";
import qs from "qs";

const Wrapper = styled.div`
  padding: 0 20px;

  .ant-table-tbody .ant-table-row {
    cursor: pointer;
  }
  span.ant-tag {
    margin-right: 0 !important;
    font-size: 14px;
  }
  .ant-table-column-title {
    font-weight: 800;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  .ant-checkbox-group-item.ant-checkbox-wrapper {
    span {
      font-weight: 800;
    }
  }
`;

const canceledOptions = ["정상", "해약"];

const columns = [
  {
    title: "고객ID",
    dataIndex: "customer_id",
    key: "customer_id",
    render: Id => <a>{Id}</a>,
    align: "center"
  },
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
    title: "납부유형",
    dataIndex: "payment_type",
    key: "payment_type",
    align: "center"
  },
  {
    title: "월렌탈비용",
    dataIndex: "rental_cost",
    key: "rental_cost",
    align: "center",
    render: cost => parseInt(cost).toLocaleString() + "원"
  },
  {
    title: "연체건수",
    dataIndex: "num_arrear",
    key: "num_arrear",
    align: "center"
  },
  {
    title: "신용등급",
    dataIndex: "credit_rating",
    key: "credit_rating",
    align: "center"
  },
  {
    title: "해약여부",
    dataIndex: "canceled",
    key: "canceled",
    align: "center",
    render: tag => (
      <span>
        <Tag color={tag == "해약" ? "red" : "green"} key={tag}>
          {tag}
        </Tag>
      </span>
    )
  }
];

const SaleTable = ({ results, counts, setSales, history }) => {
  // console.log(results);
  const [customerId, setCustomerId] = useState("");
  const [page, setPage] = useState(1);
  const [canceled, setCanceled] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = async checkedValues => {
    // console.log(checkedValues);
    let localCanceled = null;
    if (checkedValues) {
      localCanceled = checkedValues.join(",");
    }
    // setCanceled(qs);
    console.log(localCanceled);
    setCanceled(localCanceled);
    let dict = { canceled: localCanceled };
    if (customerId) {
      dict.customerId = customerId;
    }
    if (page) {
      dict.page = page;
    }

    let localQs = qs.stringify(dict);

    // console.log(qs);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/sales/?${localQs}`
      );
      setSales(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async e => {
    // await input.onChange(e);
    setCustomerId(e.target.value);
    let dict = { customerId: e.target.value };
    if (page) {
      dict.page = page;
    }
    if (canceled) {
      dict.canceled = canceled;
    }

    let localQs = qs.stringify(dict);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/sales/?${localQs}`
      );
      setSales(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const pagination = {
    defaultCurrent: 1,
    total: counts
  };

  const handleChange = async e => {
    setPage(e.current);
    let dict = { page: e.current };

    if (customerId) {
      dict.customerId = customerId;
    }
    if (canceled) {
      dict.canceled = canceled;
    }

    let localQs = qs.stringify(dict);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/sales/?${localQs}`
      );
      setSales(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <Checkbox.Group
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          options={canceledOptions}
          onChange={onChange}
        />
        <Input
          value={customerId}
          onChange={handleInputChange}
          style={{ width: "300px" }}
          placeholder="고객 ID"
        />
      </FilterWrapper>
      <Table
        pagination={pagination}
        rowKey="id"
        columns={columns}
        dataSource={results}
        onChange={handleChange}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              const pathname = new URL(record.url).pathname;
              history.push(pathname);
            } // click row
          };
        }}
      />
    </Wrapper>
  );
};

export default withRouter(SaleTable);
