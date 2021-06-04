import React, { useEffect, useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "./index";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductByDate,
  CategoryByDate,
  SaledByDate,
} from "../../stores/actions/statsAction";
import { Header, FilterText, SearchButton } from "./ProductManage/ManageStyle";
import { CategoryMappingReverse } from "../../utils/CategoryMapping";

import clsx from "clsx";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
      SW 6팀
    </Typography>
  );
}

function AdminMain() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-12-31");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dispatch = useDispatch();
  const SeledAll = useSelector((state) => state.StatsReducer.saleall.data);
  const CategoryAll = useSelector((state) => state.StatsReducer.category.data);
  const ProductAll = useSelector((state) => state.StatsReducer.product.data);
  const onStartDateHandler = useCallback(
    (e) => {
      setStartDate(e.target.value);
      console.log(startDate);
    },
    [startDate]
  );
  const onEndDateHandler = useCallback(
    (e) => {
      setEndDate(e.target.value);
      console.log(endDate);
    },
    [endDate]
  );
  const FilterSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(startDate);
      console.log(endDate);
      if (startDate && endDate) {
        dispatch(CategoryByDate(startDate, endDate));
        dispatch(SaledByDate(startDate, endDate));
        dispatch(ProductByDate(startDate, endDate));
      } else {
        alert("빈칸을 입력하세요");
      }
    },
    [startDate, endDate]
  );
  useEffect(() => {
    dispatch(SaledByDate(startDate, endDate));
    dispatch(CategoryByDate(startDate, endDate));
    dispatch(ProductByDate(startDate, endDate));
  }, []);
  useEffect(() => {
    if (CategoryAll) {
      {
        CategoryAll.map((item) => {
          item.CategoryName = CategoryMappingReverse[item.CategoryName];
        });
      }
    }
  }, [CategoryAll]);
  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container mmaxWidth="lg">
          <Header style={{ marginBottom: "0" }}>
            <FilterText>시작 날짜</FilterText>
            <TextField
              style={{ width: "200px", height: "60px", marginRight: "10px" }}
              variant="outlined"
              fullWidth
              size="small"
              id="startdate"
              name="startdate"
              type="date"
              autoComplete="startdate"
              value={startDate}
              onChange={onStartDateHandler}
              autoFocus
            />
            <FilterText>종료 날짜</FilterText>
            <TextField
              style={{ width: "200px", height: "60px", marginRight: "10px" }}
              variant="outlined"
              fullWidth
              size="small"
              id="endDate"
              name="enddate"
              type="date"
              value={endDate}
              onChange={onEndDateHandler}
              autoComplete="enddate"
              autoFocus
            />
            <SearchButton onClick={FilterSubmit}>검색</SearchButton>
          </Header>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            {CategoryAll && (
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart data={CategoryAll} />
                </Paper>
              </Grid>
            )}
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits
                  data={SeledAll}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders data={ProductAll} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </>
  );
}

export default AdminMain;
