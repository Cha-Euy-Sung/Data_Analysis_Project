import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Checkbox, Input } from "antd";
import styled from "styled-components";
import { withRouter } from "react-router";

const Wrapper = styled.div`
  padding: 0 20px;

  .ant-table-tbody .ant-table-row {
    cursor: pointer;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
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
    align: "center"
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
    align: "center"
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
        <Tag color={tag == "해약" ? "volcano" : "green"} key={tag}>
          {tag}
        </Tag>
      </span>
    )
  }
];

const SaleTable = ({ results, counts, setSales, history }) => {
  // console.log(results);
  const [customerId, setCustomerId] = useState("");
  const [page, setPage] = useState("");
  const [canceled, setCanceled] = useState("");
  const [url, setUrl] = useState("http://localhost:8000/sales/");

  // useEffect(() => {
  //   setUrl(makeQuery());
  //   setCustomerId(customerId);
  //   setPage(page);
  //   setCanceled(canceled);
  // }, [url]);

  const makeQuery = ({ name, value }) => {
    console.log(name, value);
    let url = "http://localhost:8000/sales/?";
    console.log(customerId, page, canceled);

    if (name && value) {
      console.log("호출");
      if (name == "canceled" || canceled) {
        console.log(111);
        setCanceled(value);
        if (name == "canceled") {
          console.log(111222);
          url += `canceled=${value}&`;
        } else {
          url += `canceled=${canceled}&`;
        }
      }
      if (name == "customerId" || customerId) {
        console.log(222);
        // setCustomerId(value);
        if (name == "customerId") {
          url += `customerId=${value}&`;
        } else {
          url += `customerId=${customerId}&`;
        }
      }
      if (name == "page" || page) {
        console.log(333);
        setPage(value);
        if (name == "page") {
          url += `page=${value}&`;
        } else {
          url += `page=${page}&`;
        }
      }
    }

    // if (customerId) {
    //   url += `customerId=${customerId}&`;
    // }
    // if (page) {
    //   url += `page=${page}&`;
    // }
    // if (canceled) {
    //   url += `canceled=${canceled}&`;
    // }
    url = url.replace(/[?, &]$/gi, "");
    console.log(url);
    setUrl(url);
    return url;
  };

  const onChange = async checkedValues => {
    // console.log(checkedValues);
    let qs = null;
    if (checkedValues) {
      qs = checkedValues.join(",");
    }
    // setCanceled(qs);
    // setUrl(makeQuery());
    console.log(qs);

    // console.log(qs);
    console.log(url);
    try {
      const { data } = await axios.get(
        // `http://localhost:8000/sales/?canceled=${qs}`
        makeQuery({ name: "canceled", value: qs })
      );
      setSales(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleInputChange = async e => {
    // await input.onChange(e);
    setCustomerId(e.target.value);
    try {
      const { data } = await axios.get(
        // `http://localhost:8000/sales/?customerId=${e.target.value}`
        makeQuery({ name: "customerId", value: e.target.value })
      );
      setSales(data);
    } catch (e) {
      console.log(e);
    }
  };

  const pagination = {
    defaultCurrent: 1,
    total: counts
  };

  const handleChange = async e => {
    console.log(e.current);
    try {
      const { data } = await axios.get(
        // `http://localhost:8000/sales/?page=${e.current}`
        makeQuery()
      );
      setSales(data);
    } catch (e) {
      console.log(e);
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
