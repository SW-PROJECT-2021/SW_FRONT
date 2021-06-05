import React, { useEffect, useCallback, useState } from "react";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  UploadButton,
  SearchInput,
  SearchButton,
  TableCell,
  Header,
} from "../ProductManage/ManageStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  getbanners,
  sortbanner,
  searchbanner,
  detailbannerClear,
} from "../../../stores/actions/bannerActions";
import BannerList from "./BannerList";
import Box from "@material-ui/core/Box";
import { Copyright } from "../AdminMain";

function Banner() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [bannerStart, setBannerStart] = useState(null);
  const { loading, data, error } = useSelector(
    (state) => state.BannerReducer.bannerlist
  );
  console.log(data);
  useEffect(() => {
    dispatch(getbanners());
    dispatch(detailbannerClear());
  }, []);
  const onBannerStartHandler = useCallback(
    (e) => {
      setBannerStart(e.target.value);
    },
    [bannerStart]
  );

  const onSearch = useCallback(
    (e) => {
      if (bannerStart) {
        dispatch(searchbanner(bannerStart));
      }
    },
    [bannerStart]
  );
  const sortChange = useCallback((e) => {
    const {
      target: { value },
    } = e;
    let data = {
      sort: "bannerStartDate",
      direction: value,
    };
    dispatch(sortbanner(data));
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>서버 에러!</div>;
  if (!data) return null;

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>공지 이벤트 관리</Title>
            <Header>
              <Link to="/admin/Banner/PostBanner">
                <UploadButton>배너 등록</UploadButton>
              </Link>
              <TextField
                style={{ width: "200px", height: "60px", marginRight: "10px" }}
                variant="outlined"
                fullWidth
                id="startdate"
                name="startdate"
                type="date"
                autoComplete="startdate"
                autoFocus
                value={bannerStart}
                onChange={onBannerStartHandler}
              />
              <SearchButton onClick={onSearch}>검색</SearchButton>
              <select
                onChange={sortChange}
                style={{
                  width: "80px",
                  height: "40px",
                  float: "right",
                }}
              >
                <option>정렬</option>
                <option value="DESC">오래된 순</option>
                <option value="ASC">최신순</option>
              </select>
            </Header>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">등록번호</TableCell>
                  <TableCell align="left">배너 이름</TableCell>
                  <TableCell align="left">미리보기</TableCell>
                  <TableCell align="left">시작시간 </TableCell>
                  <TableCell align="right">종료시간</TableCell>
                  <TableCell align="right">옵션</TableCell>
                </TableRow>
              </TableHead>
              <BannerList data={data} />
            </Table>
          </Paper>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}

export default Banner;
