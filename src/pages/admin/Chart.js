import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CategoryMappingReverse } from "../../utils/CategoryMapping";
import Title from "./Title";

export default function Chart({ data }) {
  const theme = useTheme();
  console.log(data);
  return (
    <React.Fragment>
      <Title>가장 많이 팔린 카테고리(5개)</Title>
      <ResponsiveContainer width="80%">
        <BarChart
          width={50}
          height={30}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="CategoryName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
