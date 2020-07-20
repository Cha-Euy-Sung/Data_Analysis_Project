import React, { useState, userEffect } from "react";
import axios from "axios";
import { Table, Menu, Dropdown, Icon, Checkbox, Input, Tag } from "antd";
import { Map, CircleMarker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./cities";
import styled from "styled-components";
import { withRouter } from "react-router";
import qs from "qs";

const { SubMenu } = Menu;

const genderOptions = ["남자", "여자"];

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
`;

const TableWrapper = styled.div`
  width: 70%;
  tbody > tr > td {
    padding: 14px 16px;
  }

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

const columns = [
  {
    title: "고객ID",
    dataIndex: "customer_id",
    key: "customer_id",
    render: Id => <a>{Id}</a>,
    align: "center"
  },
  {
    title: "고객유형",
    dataIndex: "customer_type",
    key: "customer_type",
    align: "center"
  },
  {
    title: "생년",
    dataIndex: "birth_year",
    key: "birth_year",
    align: "center"
  },
  {
    title: "거주지",
    dataIndex: "province",
    key: "province",
    align: "center"
  },
  {
    title: "성별",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    render: tag => (
      <span>
        <Tag color={tag == "남자" ? "blue" : "magenta"} key={tag}>
          {tag}
        </Tag>
      </span>
    )
  }
];

const MemberTable = ({ results, counts, setMembers, history }) => {
  const [customerId, setCustomerId] = useState("");
  const [gender, setGender] = useState();
  const [page, setPage] = useState(1);
  const [province, setProvince] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = async checkedValues => {
    let localGender = null;
    if (checkedValues) {
      localGender = checkedValues.join(",");
    }
    setGender(localGender);
    let dict = { gender: localGender };

    if (customerId) {
      dict.customerId = customerId;
    }
    if (page) {
      dict.page = page;
    }
    if (province) {
      dict.province = province;
    }

    let localQs = qs.stringify(dict);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/members/?${localQs}`
      );
      setMembers(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  // const input = useInput("");

  const clickMarker = async city => {
    setProvince(city.province);
    let dict = { province: city.province };

    if (province == city.province) {
      dict = {};
    }
    if (page) {
      dict.page = page;
    }
    if (gender) {
      dict.gender = gender;
    }
    if (customerId) {
      dict.customerId = customerId;
    }

    let localQs = qs.stringify(dict);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/members/?${localQs}`
      );
      setMembers(data);
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
    if (gender) {
      dict.gender = gender;
    }
    if (province) {
      dict.province = province;
    }

    let localQs = qs.stringify(dict);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/members/?${localQs}`
      );
      setMembers(data);
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
    if (gender) {
      dict.gender = gender;
    }
    if (province) {
      dict.province = province;
    }

    let localQs = qs.stringify(dict);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/members/?${localQs}`
      );
      setMembers(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  var centerLat = (data.minLat + data.maxLat) / 2;
  var distanceLat = data.maxLat - data.minLat;
  var bufferLat = distanceLat * 0.05;
  var centerLong = (data.minLong + data.maxLong) / 2;
  var distanceLong = data.maxLong - data.minLong;
  var bufferLong = distanceLong * 0.15;

  return (
    <Wrapper>
      <Map
        style={{ height: "600px", width: "30%" }}
        zoom={1}
        center={[centerLat, centerLong]}
        bounds={[
          [data.minLat - bufferLat, data.minLong - bufferLong],
          [data.maxLat + bufferLat, data.maxLong + bufferLong]
        ]}
      >
        {/* <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url="http://localhost:3000/tiles/{z}/{x}/{y}.png" />

        {data.city.map((city, k) => {
          return (
            <CircleMarker
              key={k}
              center={[city["coordinates"][1], city["coordinates"][0]]}
              radius={20 * Math.log(city["population"] / 250)}
              fillOpacity={0.5}
              stroke={false}
              onClick={e => clickMarker(city)}
            />
          );
        })}
      </Map>
      <TableWrapper>
        <FilterWrapper>
          <Checkbox.Group
            style={{
              width: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            options={genderOptions}
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
          style={{ paddingLeft: "10px", width: "100%" }}
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
      </TableWrapper>
    </Wrapper>
  );
};

export default withRouter(MemberTable);
