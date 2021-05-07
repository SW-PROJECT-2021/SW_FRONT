import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import styled from "styled-components";
import axios from "axios";
import { AllData } from "../DummyData";

import ProductList from "./ProductList";
import Pagination from "./Pagination";

const Button = styled.button`
  width: 70px;
  height: 30px;
`;

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  .search {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .filter {
    grid-column: 1 / span 1;
    grid-row: 2 / span 3;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .itemlist {
    grid-column: 2 / -1;
    grid-row: 1 / span 4;
    margin-bottom: 10px;
  }
  .iteminfo {
    grid-column: 2 / -1;
    grid-row: 5 / span 2;
  }
`;

function ProductManage() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [ProductData, setProductData] = useState(null);
  /*전체 상품 조회 */
  useEffect(() => {
    async function GetProductList() {
      setLoading(true);
      await axios
        .get("http://15.164.20.183:3003/product")
        .then((response) => {
          setProductData(response.data);
          console.log(response.data);
        })
        .catch((err) => console.error(err));
      setLoading(false);
    }
    GetProductList();
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
  if (!ProductData) return null;

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <StyledGrid>
          <div className="search">
            <Paper className={classes.paper}>검색기능 들어갈거임</Paper>
          </div>{" "}
          <div className="filter">
            <Paper className={classes.paper}>정렬기능 들어갈거임</Paper>
          </div>
          <Grid item className="itemlist">
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>상품 관리</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">등록번호</TableCell>
                      <TableCell align="left">카테고리 분류</TableCell>
                      <TableCell align="left">이름</TableCell>
                      <TableCell align="center">상세 정보 및 수정</TableCell>
                      <TableCell align="right">삭제</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* 목록구현 */}
                    <ProductList posts={slicePost(ProductData.data)} />
                  </TableBody>
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPost={ProductData.data.length}
                    setCurrentPage={setCurrentPage}
                  />
                </Table>
                <Link to="/admin/ProductManage/PostProduct">
                  <Button>제품 등록</Button>
                </Link>
              </React.Fragment>
            </Paper>
          </Grid>
        </StyledGrid>
      </Container>
    </main>
  );
}

export default ProductManage;
