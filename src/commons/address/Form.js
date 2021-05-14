import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
   Button,
   ButtonGroup,
   makeStyles,
   Modal,
   Paper,
} from "@material-ui/core";
import DaumPostcode from "react-daum-postcode";

const postCodeStyle = {
   display: "block",
   width: "400px",
   height: "500px",
};

const useStyles = makeStyles((theme) => ({
   root: {
      margin: "5px",
      padding: "10px",
   },
   button: {
      margin: "6px 0px",
   },
   gobackButton: {
      position: "relative",
      right: "10px",
   },
   paper: {
      position: "relative",
      left: "50px",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
   },
}));

function Form({ setAddressList, length, setOnList, info, setInfo, onEdit }) {
   const [open, setOpen] = useState(false);
   const classes = useStyles();

   useEffect(() => {
      if (length === 0) {
         setInfo((prev) => ({ ...prev, default: true }));
      }
   }, [length, setInfo]);

   const initInfo = () => {
      setInfo({
         createdAt: 0,
         addressName: "",
         name: "",
         zonecode: "",
         address: "",
         detail: "",
         phone: "",
         default: false,
      });
   };
   const onSubmit = () => {
      if (onEdit) {
         //업데이트
         setAddressList((prev) =>
            prev.map((item) => {
               if (item.createdAt === info.createdAt) {
                  return info;
               } else {
                  return item;
               }
            })
         );
      } else {
         setAddressList((prev) => [
            ...prev,
            { ...info, createdAt: Date.now() },
         ]);
      }
      //여기선 등록 후, 다시 되돌아가면 됨.
      // + 배송지 다시 받아오기
      setOnList(true);
      initInfo();
   };
   const onChange = (e) => {
      const {
         target: { name, value },
      } = e;
      if (name === "default") {
         setInfo((prev) => ({ ...prev, default: !prev.default }));
      } else {
         setInfo((prev) => ({ ...prev, [name]: value }));
      }
   };
   const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.bname !== "") {
         extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
         extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setInfo((prev) => ({
         ...prev,
         zonecode: data.zonecode,
         address: fullAddress,
      }));
      setOpen(false);
   };

   return (
      <Paper className={classes.root}>
         <Typography variant="h6" gutterBottom>
            배송지 등록
         </Typography>
         <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
               <TextField
                  required
                  id="addressName"
                  name="addressName"
                  label="배송지 이름"
                  value={info.addressName}
                  onChange={onChange}
                  fullWidth
                  autoComplete="given-name"
               />
            </Grid>
            <Grid item xs={6} sm={6}>
               <TextField
                  required
                  id="name"
                  name="name"
                  label="성함"
                  value={info.name}
                  onChange={onChange}
                  fullWidth
                  autoComplete="given-name"
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  required
                  id="zonecode"
                  name="zonecode"
                  value={info.zonecode}
                  label="우편번호"
                  fullWidth
               />
            </Grid>
            <Grid item xs={6}>
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpen(true)}
                  className={classes.button}
               >
                  우편주소
               </Button>
            </Grid>
            <Grid item xs={12}>
               <TextField
                  id="address"
                  name="address"
                  label="주소"
                  value={info.address}
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  required
                  id="detail"
                  name="detail"
                  value={info.detail}
                  onChange={onChange}
                  label="상세주소"
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  id="phone"
                  name="phone"
                  label="연락처"
                  value={info.phone}
                  onChange={onChange}
                  fullWidth
               />
            </Grid>
            <Grid item xs={6}>
               <FormControlLabel
                  control={
                     <Checkbox
                        color="secondary"
                        name="default"
                        value={info.default}
                     />
                  }
                  label="기본 배송지로 등록"
                  onChange={onChange}
               />
            </Grid>
            <Grid item xs={6}>
               <ButtonGroup
                  className={`${classes.gobackButton} ${classes.button}`}
               >
                  <Button variant="outlined" color="primary" onClick={onSubmit}>
                     등록
                  </Button>
                  <Button
                     variant="outlined"
                     color="secondary"
                     onClick={() => {
                        initInfo();
                        setOnList(true);
                     }}
                  >
                     취소
                  </Button>
               </ButtonGroup>
            </Grid>
         </Grid>
         <Modal open={open} onClose={() => setOpen(false)}>
            <div className={classes.paper}>
               <DaumPostcode
                  style={postCodeStyle}
                  onComplete={handleComplete}
               />
            </div>
         </Modal>
      </Paper>
   );
}
export default Form;
