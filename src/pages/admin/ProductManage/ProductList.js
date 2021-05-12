import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Update, Option } from "./ManageStyle";
import { CategoryMappingById } from "../../../utils/CategoryMapping";
import * as ProductApi from "../../../stores/api/productApi";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 0px solid rgb(65, 83, 175);
  background-color: #ffffff;
  cursor: pointer;
  padding: 0;
`;
const changeValue = (value) => {
  if (value === "younger") {
    return { orderBy: "updatedAt", cmp: "lower" };
  } else if (value === "older") {
    return { orderBy: "updatedAt", cmp: "greater" };
  } else if (value === "priceHigher") {
    return { orderBy: "price", cmp: "lower" };
  } else if (value === "priveLower") {
    return { orderBy: "price", cmp: "greater" };
  }
};

function ProductList({ posts }) {
  const onDelete = useCallback(async (id) => {
    const result = window.confirm("제품을 삭제하시겠습니까?");
    if (result) {
      const response = await ProductApi.DeleteProduct(id);
      console.log(response);
      window.location.reload();
    }
  });
  return (
    <>
      {posts.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.id}</TableCell>
          <TableCell align="left">
            {row.isDeleted === true ? (
              <del>{CategoryMappingById[row.CategoryId]}</del>
            ) : (
              CategoryMappingById[row.CategoryId]
            )}
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="right">
            <Option>
              <Link
                to={`/admin/ProductManage/ProductDetail/${row.id}`}
                style={{ textDecoration: "none", color: "rgb(65, 83, 175)" }}
              >
                <Update>상세정보</Update>
              </Link>
              <Button onClick={() => onDelete(row.id)}>
                <DeleteIcon />
              </Button>
              <Link
                to={`/admin/ProductManage/UpdateProduct/${row.id}`}
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

export default ProductList;
