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
import React, { useState } from "react";
import { useSelector } from "react-redux";

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

function ProductReview({ list, setOpen }) {
   console.log(list);
   const classes = useStyles();
   const [loading, setLoading] = useState(false);
   const userName = useSelector(
      (state) => state.UserReducer.users.data.userName
   );
   const [review, setReview] = useState({
      id: "",
      shipment: "",
      score: "",
      recommend: "",
      detail: "",
   });
   const handleChange = (event) => {
      const name = event.target.name;
      setReview((prev) => ({
         ...prev,
         [name]: event.target.value,
      }));
   };
   const hideUserName = (name) => {
      let newName = "";
      let i = 0;
      for (let v of name) {
         if (i % 2 === 1) {
            newName += "*";
         } else {
            newName += v;
         }
         i++;
      }
      return newName;
   };
   const onClickSubmit = () => {
      setLoading(true);
      setReview((prev) => ({ ...prev, userName: hideUserName(userName) }));
      setTimeout(() => {
         setLoading(false);
         setReview({
            id: "",
            shipment: "",
            score: "",
            recommend: "",
            detail: "",
         });
      }, 500);
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
               value={review.id}
               onChange={handleChange}
               inputProps={{
                  name: "id",
                  id: "productId",
               }}>
               <option aria-label="None" value="" />
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
                  value={review.recommend}
                  onChange={handleChange}
                  inputProps={{
                     name: "recommend",
                     id: "recommend",
                  }}>
                  <option aria-label="None" value="" />
                  <option value={0}>추천</option>
                  <option value={1}>보통</option>
                  <option value={2}>비추천</option>
               </Select>
            </FormControl>

            <FormControl className={classes.smallForm}>
               <InputLabel htmlFor="age-native-simple">배송평가</InputLabel>
               <Select
                  native
                  value={review.shipment}
                  onChange={handleChange}
                  inputProps={{
                     name: "shipment",
                     id: "shipment",
                  }}>
                  <option aria-label="None" value="" />
                  <option value={0}>빠름</option>
                  <option value={1}>보통</option>
                  <option value={2}>느림</option>
               </Select>
            </FormControl>

            <FormControl className={classes.smallForm}>
               <InputLabel htmlFor="age-native-simple">점수</InputLabel>
               <Select
                  native
                  value={review.score}
                  onChange={handleChange}
                  inputProps={{
                     name: "score",
                     id: "score",
                  }}>
                  <option aria-label="None" value="" />
                  <option value={1}>1점</option>
                  <option value={2}>2점</option>
                  <option value={3}>3점</option>
                  <option value={4}>4점</option>
                  <option value={5}>5점</option>
               </Select>
            </FormControl>
         </div>
         <TextField
            id="new-detail"
            value={review.detail}
            margin="normal"
            name="detail"
            onChange={handleChange}
            fullWidth
            label="내용"
            multiline
            rows="10"
         />
         <div className={classes.buttonAlign}>
            <Button variant="outlined" color="primary" onClick={onClickSubmit}>
               문의 등록
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
