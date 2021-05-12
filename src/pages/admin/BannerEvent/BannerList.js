import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  TableRow,
  TableCell,
  Header,
  TableBody,
  Update,
} from "../ProductManage/ManageStyle";
import styled from "styled-components";
import { DateChange } from "../../../utils/DateChange";
const ImgBlock = styled.img`
  width: 100px;
  height: 80px;
`;

function BannerList({ data }) {
  console.log(data);
  return (
    <>
      {data.map((row) => (
        <TableRow>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.bannerName}</TableCell>
          <TableCell>
            <ImgBlock src={row.bannerImg} alt="배너"></ImgBlock>
          </TableCell>
          <TableCell>{DateChange(row.bannerStartDate)}</TableCell>
          <TableCell>{DateChange(row.bannerEndDate)}</TableCell>
          <TableCell>
            <Link
              to={`/admin/Banner/BannerDetail/${row.id}`}
              style={{ textDecoration: "none", color: "rgb(65, 83, 175)" }}
            >
              <Update>상세정보</Update>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
export default BannerList;
