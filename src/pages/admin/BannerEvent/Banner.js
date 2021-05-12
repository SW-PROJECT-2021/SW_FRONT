import React, { useEffect } from "react";
import { useStyles } from "../index";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Title from "../Title";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  UploadButton,
  TableCell,
  Header,
} from "../ProductManage/ManageStyle";
import { useDispatch, useSelector } from "react-redux";
import { getbanners } from "../../../stores/actions/bannerActions";
import BannerList from "./BannerList";

function Banner() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.BannerReducer.bannerlist
  );
  console.log(data);
  useEffect(() => {
    dispatch(getbanners());
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
      </Container>
    </main>
  );
}

export default Banner;
