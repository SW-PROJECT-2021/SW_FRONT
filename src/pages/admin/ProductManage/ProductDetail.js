import React, { useCallback, useEffect } from "react";
import Title from "../Title";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { useSelector, useDispatch } from "react-redux";
import { DateChange } from "../../../utils/DateChange";
import { getProductById } from "../../../stores/actions/productActions";
import styled from "styled-components";
import { useStyles } from "../index";
import Container from "@material-ui/core/Container";
import { Key, Value, ImgBlock, HeaderBlock } from "./ManageStyle";
import { CategoryMappingById } from "../../../utils/CategoryMapping";

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
  .img-block {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    height: 100%;
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

function ProductDetail({ match }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.ProductReducer.productDetail
  );
  console.log(match.params.id);
  console.log(data);

  useEffect(() => {
    dispatch(getProductById(match.params.id));
  }, [dispatch]);

  if (loading) return <div style={{ zIndex: "5" }}>loading</div>;
  if (error) return <div style={{ zIndex: "5" }}>error</div>;
  if (!data) return null;
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <header>
              <Title>상세 정보</Title>
            </header>
            <Divider></Divider>
            <Body>
              <HeaderBlock>
                <div className="left-block">
                  <p>제품 이미지</p>
                  <div className="img-block">
                    <ImgBlock>
                      <img src={data.data.img1} alt="img"></img>
                    </ImgBlock>
                    <ImgBlock>
                      <img src={data.data.img2} alt="img"></img>
                    </ImgBlock>
                    <ImgBlock>
                      <img src={data.data.img3} alt="img"></img>
                    </ImgBlock>
                  </div>
                </div>
                <div className="left-block">
                  <p>제품 설명</p>
                  <div className="line">
                    <Key>제품 이름</Key>
                    <Value>{data.data.name}</Value>
                  </div>
                  <div className="line">
                    <Key>카테고리</Key>
                    <Value>{CategoryMappingById[data.data.CategoryId]}</Value>
                  </div>
                  <div className="line">
                    <Key>제품 가격</Key>
                    <Value>{data.data.price}</Value>
                  </div>
                  <div className="line">
                    <Key>제품 수량</Key>
                    <Value>{data.data.count}</Value>
                  </div>
                  <div className="line">
                    <Key>상세설명</Key>
                    <Value>{data.data.detail}</Value>
                  </div>
                  <div className="line">
                    <Key>등록 날짜:</Key>
                    <Value>{DateChange(data.data.createdAt)}</Value>
                  </div>
                  <div className="line">
                    <Key>최근 수정 날짜:</Key>
                    <Value>{DateChange(data.data.updatedAt)}</Value>
                  </div>
                  <div className="line">
                    <Key>배송비:</Key>
                    <Value>{data.data.delivery}</Value>
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

export default ProductDetail;
