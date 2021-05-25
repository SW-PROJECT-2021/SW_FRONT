import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../index";
import Container from "@material-ui/core/Container";
import Title from "../Title";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  postbanner,
  postProductClear,
} from "../../../stores/actions/bannerActions";
const Form = styled.form`
  div {
    margin-top: 5px;
    display: flex;
    width: 500px;
  }
  div span {
    width: 200px;
    text-align: center;
    padding-top: 25px;
    margin-right: 10px;
    font-family: NanumSquareRegular;
    font-size: 16px;
  }
  img {
    width: 100%;
    height: 400px;
  }
`;

function PostBanner() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.BannerReducer.bannerpost
  );
  const history = useHistory();
  const [bannerName, setBannerName] = useState(null);
  const [bannerStart, setBannerStart] = useState(null);
  const [bannerEnd, setBannerEnd] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [bannerDetail, setBannerDetail] = useState(null);

  const onBannerDetailHanlder = useCallback((e) => {
    setBannerDetail(e.target.value);
  });
  const onBannerNameHandler = useCallback((e) => {
    setBannerName(e.target.value);
  });
  const onBannerStartHandler = useCallback((e) => {
    setBannerStart(e.target.value);
  });
  const onBannerEndHandler = useCallback((e) => {
    setBannerEnd(e.target.value);
  });
  const onBannerImgHandler = useCallback((e) => {
    setBannerImg(e.target.files[0]);
  });
  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if (bannerName && bannerStart && bannerEnd && bannerImg && bannerDetail) {
      const formData = new FormData();
      formData.append("img", bannerImg);
      formData.append("name", bannerName);
      formData.append("detail", bannerDetail);
      formData.append("startDate", bannerStart);
      formData.append("endDate", bannerEnd);

      dispatch(postbanner(formData));
    } else {
      alert("빈칸을 채워주세요!");
    }
  });
  useEffect(() => {
    if (data) {
      alert("배너 등록 성공");
      history.push("/admin/Banner");
      dispatch(postProductClear());
    }
  }, [data]);
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>배너 등록</Title>
            <Divider></Divider>
            <Form onSubmit={onSubmitHandler} id="myForm">
              <div>
                <span>배너 이름</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={bannerName}
                  onChange={onBannerNameHandler}
                />
              </div>
              <div>
                <span>배너 상세설명</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="detail"
                  label="detail"
                  name="detail"
                  type="text"
                  autoComplete="detail"
                  autoFocus
                  value={bannerDetail}
                  onChange={onBannerDetailHanlder}
                />
              </div>
              <div>
                <span>배너 시작 날짜</span>
                <TextField
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
              </div>
              <div>
                <span>배너 종료 날짜</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="enddate"
                  name="enddate"
                  type="date"
                  autoComplete="enddate"
                  autoFocus
                  value={bannerEnd}
                  onChange={onBannerEndHandler}
                />
              </div>
              <div>
                <span>이미지 등록</span>
                <span>
                  <input
                    type="file"
                    accept="image/ipg, image/png, image/jpeg, image/gif"
                    name="imgfile"
                    onChange={onBannerImgHandler}
                  />
                </span>
              </div>
              <Button id="Submit" type="submit" variant="contained">
                배너 등록
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default PostBanner;
