import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { CategoryMappingById } from "../../utils/CategoryMapping";
import { DateChange } from "../../utils/DateChange";

export default function Orders({ data }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!data) return null;
  let SliceData = data.slice(0, 5);

  return (
    <React.Fragment>
      <Title>가장 많이 팔린 상품</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>제품 등록 날짜</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>판매량</TableCell>
            <TableCell align="right">총 판매금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SliceData.map((row) => (
            <TableRow key={row.Product.id}>
              <TableCell>{DateChange(row.Product.createdAt)}</TableCell>
              <TableCell>{row.Product.name}</TableCell>
              <TableCell>
                {CategoryMappingById[row.Product.CategoryId]}
              </TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell align="right">
                {numberWithCommas(row.Product.price)} 원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
