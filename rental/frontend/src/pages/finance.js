import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import {
  salesData,
  salesData1,
  salesData2,
  canceledData,
  countsData
} from "../components/financial";
import styled from "styled-components";
import Wrapper from "../components/Wrapper";

const Top = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 20px;
`;

export default () => {
  return (
    <Wrapper>
      <Top>
        {/* 해약률 */}
        <ChartContainer>
          <Title>해약률</Title>
          <LineChart
            width={600}
            height={300}
            data={canceledData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="term" />
            <YAxis padding={{ top: 30 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend width={600} />
            <Line
              type="monotone"
              dataKey="cancelRate"
              name="해약률"
              stroke="#82ca9d"
            >
              <LabelList
                dataKey="cancelRate"
                content={({ x, y, value }) => {
                  return (
                    <text x={x - 15} y={y - 10}>
                      {value.toLocaleString() + "%"}
                    </text>
                  );
                }}
                position="insideTop"
              />
            </Line>
          </LineChart>
        </ChartContainer>
        {/* 국내 및 해외 계정 현황 */}
        <ChartContainer>
          <Title>국내 및 해외 계정 현황</Title>
          <BarChart
            width={400}
            height={300}
            data={countsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis
              label={{ value: "계정", position: "insideTop" }}
              padding={{ top: 40 }}
            />
            <Tooltip />
            <Legend width={400} />
            <Bar
              // isAnimationActive={false}
              dataKey="domestic"
              unit="k"
              name="국내"
              stackId="a"
              fill="#1f77b4"
            >
              <LabelList
                dataKey="domestic"
                content={({ x, y, value }) => {
                  return (
                    <text x={x + 15} y={y + 20}>
                      {value.toLocaleString() + "k"}
                    </text>
                  );
                }}
                position="inside"
              />
            </Bar>
            <Bar
              dataKey="overseas"
              unit="k"
              name="해외"
              stackId="a"
              fill="#ff7f0e"
            >
              <LabelList
                dataKey="overseas"
                content={({ x, y, fill, width, value }) => {
                  console.log(value.toLocaleString() + "k");
                  return (
                    <text x={x + 16} y={y + 15} fill={fill} width={width}>
                      {value.toLocaleString() + "k"}
                    </text>
                  );
                }}
                position="insideTop"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </Top>
      <Bottom>
        {/* 매출액 */}
        <ChartContainer>
          <Title>매출액</Title>
          <BarChart
            width={300}
            height={300}
            data={salesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis
              label={{ value: "십억원", position: "insideTop" }}
              padding={{ top: 40 }}
            />
            <Tooltip />
            <Legend width={300} />
            <Bar dataKey="sales" name="매출액" fill="#8884d8">
              <LabelList dataKey="sales" position="insideTop" />
            </Bar>
          </BarChart>
        </ChartContainer>
        {/* 영업이익 */}
        <ChartContainer>
          <Title>영업이익</Title>
          <BarChart
            width={300}
            height={300}
            data={salesData1}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis
              label={{ value: "십억원", position: "insideTop" }}
              padding={{ top: 40 }}
            />
            <Tooltip />
            <Legend width={300} />
            <Bar dataKey="sales" name="영업이익" fill="#ffc658">
              <LabelList dataKey="sales" position="insideTop" />
            </Bar>
          </BarChart>
        </ChartContainer>
        {/* 당기순이익 */}
        <ChartContainer>
          <Title>당기순이익</Title>
          <BarChart
            width={300}
            height={300}
            data={salesData2}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" />
            <YAxis
              label={{ value: "십억원", position: "insideTop" }}
              padding={{ top: 40 }}
            />
            <Tooltip />
            <Legend width={300} />
            <Bar dataKey="sales" name="당기순이익" fill="#82ca9d">
              <LabelList dataKey="sales" position="insideTop" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </Bottom>
    </Wrapper>
  );
};
