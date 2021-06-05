import {
   Button,
   FormControl,
   InputLabel,
   makeStyles,
   Modal,
   Select,
   TextField,
   Typography,
   CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 330,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
   smallFormContainer: {
      margin: theme.spacing(1),
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
   },
   smallForm: {
      width: "30%",
   },
   buttonAlign: {
      textAlign: "center",
   },
   loading: {
      position: "absolute",
      top: "47%",
      left: "47%",
   },
}));

function ProductReview({ list, setOpen, OrderHistoryId }) {
   const classes = useStyles();
   const [loading, setLoading] = useState(false);
   const [review, setReview] = useState({
      ProductId: list.Ordered[0].id,
      delivery: 3,
      star: 5,
      recommand: 3,
      detail: "",
   });
   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      if (name === "detail" && value.length <= 100) {
         setReview((prev) => ({
            ...prev,
            [name]: value,
         }));
      } else if (name !== "detail") {
         setReview((prev) => ({
            ...prev,
            [name]: parseInt(value),
         }));
      } else {
         window.alert("최대 100자까지 입력 가능합니다.");
      }
   };
   const onClickSubmit = async () => {
      if (review.detail.length !== 0) {
         setLoading(true);
         await axios
            .post("/api/review", {
               ...review,
               OrderHistoryId: OrderHistoryId,
            })
            .then(() => {
               setReview({
                  ProductId: list.Ordered[0].id,
                  delivery: 3,
                  star: 5,
                  recommand: 3,
                  detail: "",
               });
            })
            .catch((err) => {
               console.log(err.response.message);
            });
         setLoading(false);
      } else {
         window.alert("내용을 입력해주세요.");
      }
   };
   const onClickCancel = () => {
      setOpen(false);
   };
   return (
      <div>
         <Typography variant="h5">상품평 등록</Typography>
         <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">상품선택</InputLabel>
            <Select
               native
               value={review.ProductId}
               onChange={handleChange}
               inputProps={{
                  name: "ProductId",
                  id: "ProductId",
               }}>
               {list.Ordered.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
               })}
            </Select>
         </FormControl>

         <div className={classes.smallFormContainer}>
            <FormControl className={classes.smallForm}>
               <InputLabel htmlFor="age-native-simple">추천</InputLabel>
               <Select
                  native
                  value={review.recommand}
                  onChange={handleChange}
                  inputProps={{
                     name: "recommand",
                     id: "recommand",
                  }}>
                  <option value={3}>추천</option>
                  <option value={2}>보통</option>
                  <option value={1}>비추천</option>
               </Select>
            </FormControl>

            <FormControl className={classes.smallForm}>
               <InputLabel htmlFor="age-native-simple">배송평가</InputLabel>
               <Select
                  native
                  value={review.delivery}
                  onChange={handleChange}
                  inputProps={{
                     name: "delivery",
                     id: "delivery",
                  }}>
                  <option value={3}>빠름</option>
                  <option value={2}>보통</option>
                  <option value={1}>느림</option>
               </Select>
            </FormControl>

            <FormControl className={classes.smallForm}>
               <InputLabel htmlFor="age-native-simple">점수</InputLabel>
               <Select
                  native
                  value={review.star}
                  onChange={handleChange}
                  inputProps={{
                     name: "star",
                     id: "star",
                  }}>
                  <option value={1}>1점</option>
                  <option value={2}>2점</option>
                  <option value={3}>3점</option>
                  <option value={4}>4점</option>
                  <option value={5}>5점</option>
               </Select>
            </FormControl>
         </div>
         <TextField
            ProductId="new-detail"
            value={review.detail}
            margin="normal"
            name="detail"
            onChange={handleChange}
            fullWidth
            label="내용"
            multiline
            rows="4"
         />
         <div className={classes.buttonAlign}>
            <Button variant="outlined" color="primary" onClick={onClickSubmit}>
               상품평 등록
            </Button>
            &nbsp;&nbsp;
            <Button
               variant="outlined"
               color="secondary"
               onClick={onClickCancel}>
               취소
            </Button>
         </div>
         <Modal open={loading}>
            <CircularProgress color="secondary" className={classes.loading} />
         </Modal>
      </div>
   );
}
export default ProductReview;
