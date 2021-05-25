import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../index";
import Container from "@material-ui/core/Container";
import Title from "../Title";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import {
  Key,
  Value,
  ImgBlock,
  HeaderBlock,
} from "../ProductManage/ManageStyle";
import { DateChange } from "../../../utils/DateChange";
import { getbanner } from "../../../stores/actions/bannerActions";
const Body = styled.div`
  width: 100%;
  height: auto;
  .left-block {
    width: 50%;
    height: auto;
    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }
  .info {
    display: inline-block;
    width: 50%;
    height: 50%;
  }
  img {
    width: 100%;
    vertical-align: middle;
    border-style: none;
  }
  p {
    font-size: 1.3rem;
    font-weight: bold;
    font-family: "NanumSquareBold";
    color: rgb(65, 83, 175);
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .line {
    width: 100%;
    height: auto;
    display: flex;
  }
`;
function BannerDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.BannerReducer.bannerdetail
  );
  useEffect(() => {
    dispatch(getbanner(match.params.id));
  }, [dispatch]);
  if (loading) return <div style={{ zIndex: "5" }}>loading</div>;
  if (error) return <div style={{ zIndex: "5" }}>error</div>;
  if (!data) return null;
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>상세정보</Title>
            <Divider></Divider>
            <Body>
              <HeaderBlock>
                <div className="left-block">
                  <p>배너 이미지</p>
                  <ImgBlock>
                    <img src={data.bannerImg} alt="이미지" />
                  </ImgBlock>
                </div>
                <div className="left-block">
                  <p>배너 설명</p>
                  <div className="line">
                    <Key>배너 이름</Key>
                    <Value>{data.bannerName}</Value>
                  </div>
                  <div className="line">
                    <Key>배너 상세 설명</Key>
                    <Value>{data.bannerDetail}</Value>
                  </div>
                  <div className="line">
                    <Key> 등록 날짜</Key>
                    <Value>{DateChange(data.bannerStartDate)}</Value>
                  </div>
                  <div className="line">
                    <Key>등록 해제 날짜</Key>
                    <Value>{DateChange(data.bannerEndDate)}</Value>
                  </div>
                </div>
              </HeaderBlock>
            </Body>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default BannerDetail;
