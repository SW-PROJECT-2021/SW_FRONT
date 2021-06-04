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
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  postCouponClear,
  postCouponAction,
} from "../../../stores/actions/couponAction";
import {
  CategoryList,
  CategoryListMapping,
} from "../../../utils/CategoryMapping";
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

function PostCoupon() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.CouponReducer.postcoupon
  );
  const history = useHistory();
  const [couponName, setCouponName] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [couponType, setCouponType] = useState(true);
  const [discount, setDiscount] = useState(null);
  const [category, setCategory] = useState(null);
  const [minimumPrice, setMinimumPrice] = useState(null);
  const [maximumDiscount, setMaximumDiscount] = useState(null);

  const onCategoryHandler = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category]
  );
  const onDiscountHandler = useCallback(
    (e) => {
      setDiscount(e.target.value);
    },
    [discount]
  );
  const onCouponTypeHanlder = useCallback(
    (e) => {
      setCouponType(e.target.value);
      console.log(couponType);
    },
    [couponType]
  );
  const onCouponCodeHanlder = useCallback(
    (e) => {
      setCouponCode(e.target.value);
    },
    [couponCode]
  );
  const onCouponNameHandler = useCallback(
    (e) => {
      setCouponName(e.target.value);
    },
    [couponName]
  );
  const onMinimumPriceHandler = useCallback(
    (e) => {
      setMinimumPrice(e.target.value);
    },
    [minimumPrice]
  );
  const onMaximumDiscountHandler = useCallback(
    (e) => {
      setMaximumDiscount(e.target.value);
    },
    [maximumDiscount]
  );
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (couponType === true) {
        if (couponName && couponCode && discount && minimumPrice) {
          let data = {
            name: couponName,
            code: couponCode,
            isAll: couponType,
            minimumPrice: minimumPrice,
            discount: discount,
          };
          console.log(data);
          dispatch(postCouponAction(data));
        } else {
          alert("빈칸을 채워주세요");
        }
      } else if (couponType === false) {
        if (
          couponName &&
          couponCode &&
          discount &&
          maximumDiscount &&
          category
        ) {
          let data = {
            name: couponName,
            code: couponCode,
            isAll: couponType,
            categoryId: category,
            maximumDiscount: maximumDiscount,
            discount: discount,
          };
          console.log(data);
          dispatch(postCouponAction(data));
        } else {
          alert("빈칸을 채워주세요");
        }
      } else {
        console.log("알수 없는에러");
      }
    },
    [
      couponType,
      couponName,
      couponCode,
      discount,
      minimumPrice,
      category,
      maximumDiscount,
    ]
  );
  useEffect(() => {
    if (data) {
      alert("쿠폰 등록 성공");
      history.push("/admin/Coupon");
      dispatch(postCouponClear());
    }
  }, [data]);
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>쿠폰 등록</Title>
            <Divider></Divider>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">쿠폰 종류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={couponType}
                onChange={onCouponTypeHanlder}
              >
                <MenuItem value={true}>전체 적용 가능 쿠폰</MenuItem>
                <MenuItem value={false}>특정 카테고리 적용 쿠폰</MenuItem>
              </Select>
            </FormControl>
            {couponType === true ? (
              <span style={{ color: "#ff6347" }}>
                전체 적용 가능 쿠폰은 일정 가격을 차감시켜주는 쿠폰입니다.
              </span>
            ) : (
              <span style={{ color: "#ff6347" }}>
                특정 카테고리 적용 쿠폰은 일정 가격을 퍼센트로 감소시켜주는
                쿠폰입니다
              </span>
            )}
            <Form onSubmit={onSubmitHandler} id="myForm">
              <div>
                <span>쿠폰 이름</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={couponName}
                  onChange={onCouponNameHandler}
                />
              </div>
              <div>
                <span>쿠폰 코드 생성</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="code"
                  label="code"
                  name="code"
                  type="text"
                  autoComplete="code"
                  autoFocus
                  value={couponCode}
                  onChange={onCouponCodeHanlder}
                />
              </div>
              <div>
                {couponType === true ? (
                  <span>할인 가격</span>
                ) : (
                  <span>할인율</span>
                )}
                <TextField
                  variant="outlined"
                  fullWidth
                  id="discount"
                  label="discount"
                  name="discount"
                  type="number"
                  autoComplete="discount"
                  autoFocus
                  value={discount}
                  onChange={onDiscountHandler}
                />
              </div>
              {couponType === true ? (
                <div>
                  <span>할인 적용 최소 금액</span>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="discount"
                    label="discount"
                    name="discount"
                    type="number"
                    autoComplete="discount"
                    autoFocus
                    value={minimumPrice}
                    onChange={onMinimumPriceHandler}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <span>최대 할인 금액</span>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="discount"
                      label="discount"
                      name="discount"
                      type="number"
                      autoComplete="discount"
                      autoFocus
                      value={maximumDiscount}
                      onChange={onMaximumDiscountHandler}
                    />
                  </div>
                  <div>
                    <span>카테고리선택</span>
                    <FormControl style={{ width: "200px" }}>
                      <InputLabel id="demo-simple-select-label">
                        카테고리
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={onCategoryHandler}
                      >
                        {CategoryList.map((item) => (
                          <MenuItem value={CategoryListMapping[item]}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </>
              )}
              <Button id="Submit" type="submit" variant="contained">
                쿠폰 등록
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default PostCoupon;
