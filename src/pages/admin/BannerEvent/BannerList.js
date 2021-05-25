import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  TableRow,
  TableCell,
  Option,
  Update,
} from "../ProductManage/ManageStyle";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";

import { DateChange } from "../../../utils/DateChange";
const ImgBlock = styled.img`
  width: 100px;
  height: 80px;
`;
const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 0px solid rgb(65, 83, 175);
  background-color: #ffffff;
  cursor: pointer;
  padding: 0;
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
            <Option>
              <Link
                to={`/admin/Banner/BannerDetail/${row.id}`}
                style={{ textDecoration: "none", color: "rgb(65, 83, 175)" }}
              >
                <Update>상세정보</Update>
              </Link>
              <Link
                to={`/admin/Banner/UpdateBanner/${row.id}`}
                style={{ textDecoration: "none", color: "rgb(65, 83, 175)" }}
              >
                <Button>
                  <EditIcon />
                </Button>
              </Link>
            </Option>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
export default BannerList;
