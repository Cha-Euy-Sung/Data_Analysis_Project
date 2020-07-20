import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import styled from "styled-components";
import { withRouter } from "react-router";
import {
  FaUser,
  FaRegChartBar,
  FaRegEye,
  FaFileContract
} from "react-icons/fa";

const { SubMenu } = Menu;
const CNavLink = styled(NavLink)`
  display: inline !important;
`;
const CMenu = styled(Menu)`
  .ant-menu-item i {
    margin-right: 10px;
  }
`;

const MyImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  margin-left: 50px;
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: 50px;
  position: absolute;
  font-family: "NanumBrushScript";
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const LogoTitle = styled.div`
  font-size: 30px;
  margin-left: 50px;
  color: #595959;
  &:hover {
    opacity: 0.7;
  }
`;

const TopLogo = styled(Link)`
  /* background-image: url("http://localhost:3000/top_logo.jpg"); */
  background-image: url("http://localhost:3000/water_logo_cropped.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  /* width: 100%; */
  width: 50px;
  height: 40px;
  display: block;
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
`;

const HomeMenu = ({ current, setCurrent, location: { pathname } }) => {
  // const [current, setCurrent] = useState(pathname.replace(/\//i, ""));
  console.log(pathname);
  console.log(current);
  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <div style={{ minHeight: "50px" }}>
      <LogoWrapper>
        <TopLogo to="/" onClick={() => setCurrent()}>
          <LogoTitle>PosWater</LogoTitle>
        </TopLogo>
      </LogoWrapper>
      <CMenu
        style={{ marginBottom: "5px" }}
        onClick={handleClick}
        // selectedKeys={["members", "sales", "finance", "classification"/]}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="finance">
          <i>
            <FaRegChartBar />
          </i>
          <CNavLink to="/finance">매출 현황</CNavLink>
        </Menu.Item>
        <Menu.Item key="members">
          <i>
            <FaUser />
          </i>
          <CNavLink to="/members">회원 현황</CNavLink>
        </Menu.Item>
        <Menu.Item key="sales">
          <i>
            <FaFileContract />
          </i>
          <CNavLink to="/sales">계약 현황</CNavLink>
        </Menu.Item>
        <Menu.Item key="classification">
          <i>
            <FaRegEye />
          </i>
          <CNavLink to="/classification">신규고객 해약 가능성 예측</CNavLink>
        </Menu.Item>
      </CMenu>
    </div>
  );
};

export default withRouter(HomeMenu);
