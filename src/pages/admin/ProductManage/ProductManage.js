import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Title from "../Title";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  UploadButton,
  FilterButton,
  SearchInput,
  SearchButton,
  Header,
} from "./ManageStyle";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../stores/actions/actions";

import ProductList from "./ProductList";
import Pagination from "./Pagination";

function ProductManage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.ProductReducer.productlist
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  /*전체 상품 조회 */
  useEffect(() => {
    dispatch(getProduct());
    console.log(data);
  }, []);

  /*페이지 나누기 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function slicePost(arr) {
    // 배열을 인자로 받아와 분할된 배열로 자른다.
    let currentPosts = 0;
    currentPosts = arr.slice(indexOfFirst, indexOfLast); //slice -> 분할된 배열 리턴
    return currentPosts;
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>서버 에러!</div>;
  if (!data) return null;

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <React.Fragment>
              <Title>상품 관리</Title>
              <Header>
                <Link to="/admin/ProductManage/PostProduct">
                  <UploadButton>제품 등록</UploadButton>
                </Link>
                <FilterButton>Filter</FilterButton>
                <SearchInput placeholder="Search Name" />
                <SearchButton>검색</SearchButton>
              </Header>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">등록번호</TableCell>
                    <TableCell align="left">카테고리 분류</TableCell>
                    <TableCell align="left">이름</TableCell>
                    <TableCell align="right">옵션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* 목록구현  */}
                  <ProductList posts={slicePost(data.data)} />
                </TableBody>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPost={data.data.length}
                  setCurrentPage={setCurrentPage}
                />
              </Table>
            </React.Fragment>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default ProductManage;
