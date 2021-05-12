import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../index";
import Container from "@material-ui/core/Container";
import Title from "../Title";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  postProduct,
  postProductClear,
} from "../../../stores/actions/productActions";
import { CategoryList, CategoryMapping } from "../../../utils/CategoryMapping";
const Form = styled.form`
  div {
    margin-top: 5px;
    display: flex;
    width: 500px;
  }
  div span {
    width: 100px;
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

function PostProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.ProductReducer.postproduct
  );
  const history = useHistory();
  const [category, setCategory] = useState({
    age: "",
    name: "hai",
  });
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [productImg, setProductImg] = useState({ ImgFile: null });
  const [productDetail, setProductDetail] = useState(null);
  const handleChange = (event) => {
    const name = event.target.name;
    setCategory({
      ...category,
      [name]: event.target.value,
    });
  };
  const onNameHandler = useCallback(
    (e) => {
      setProductName(e.target.value);
    },
    [productName]
  );
  const onPriceHandler = useCallback(
    (e) => {
      setProductPrice(e.target.value);
    },
    [productPrice]
  );
  const onCountHandler = useCallback(
    (e) => {
      setProductCount(e.target.value);
    },
    [productCount]
  );
  const onImgHandler = useCallback(
    (e) => {
      setProductImg(e.target.files[0]);
    },
    [productImg]
  );
  const onDetailHandler = useCallback(
    (e) => {
      setProductDetail(e.target.value);
    },
    [productDetail]
  );
  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();

    //서버통신구현
    if (
      productImg &&
      productName &&
      productPrice &&
      productCount &&
      productDetail &&
      category.age
    ) {
      const formData = new FormData();
      formData.append("img", productImg);
      formData.append("name", productName);
      formData.append("price", productPrice);
      formData.append("count", productCount);
      formData.append("detail", productDetail);
      formData.append("category", CategoryMapping[category.age]);

      dispatch(postProduct(formData));
    } else {
      alert("빈칸을 채워주세요!");
    }
  });

  useEffect(() => {
    if (data) {
      alert("상품 등록 성공");
      history.push("/admin/ProductManage");
      dispatch(postProductClear());
    }
  }, [data]);
  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid item className="itemlist">
          <Paper className={classes.paper}>
            <Title>상품 등록</Title>
            <Divider></Divider>
            <Form onSubmit={onSubmitHandler} id="myForm">
              <div>
                <span>상품명</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={productName}
                  onChange={onNameHandler}
                />
              </div>
              <div>
                <span>상품 가격</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="price"
                  label="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  autoFocus
                  value={productPrice}
                  onChange={onPriceHandler}
                />
              </div>
              <div>
                <span>상품 갯수</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="count"
                  label="count"
                  name="count"
                  type="number"
                  autoComplete="count"
                  autoFocus
                  value={productCount}
                  onChange={onCountHandler}
                />
              </div>
              <div>
                <span>상세 설명</span>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  id="detail"
                  label="detail"
                  name="detail"
                  type="text"
                  autoComplete="count"
                  autoFocus
                  value={productDetail}
                  onChange={onDetailHandler}
                />
              </div>
              <div>
                <span>카테고리</span>
                <FormControl className={classes.formControl}>
                  <NativeSelect
                    className={classes.selectEmpty}
                    value={category.age}
                    name="age"
                    onChange={handleChange}
                    inputProps={{ "aria-label": "age" }}
                  >
                    <option value="" disabled>
                      카테고리
                    </option>
                    {CategoryList.map((list, id) => (
                      <option key={id}>{list}</option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>카테고리를선택하세요</FormHelperText>
                </FormControl>
              </div>
              <div>
                <span>이미지 등록</span>
                <span>
                  <input
                    type="file"
                    accept="image/ipg, image/png, image/jpeg, image/gif"
                    name="imgfile"
                    onChange={onImgHandler}
                  />
                </span>
              </div>
              <Button id="Submit" type="submit" variant="contained">
                상품 등록
              </Button>
            </Form>
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}

export default PostProduct;
