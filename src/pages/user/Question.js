import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Divider,
   FormControl,
   InputLabel,
   Select,
   TextField,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MiliToyymmdd } from "../../utils/MiliToyymmdd";
import CustomPagination from "../../commons/CustomPagination";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "60%",
      flexShrink: 0,
   },
   secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: "20%",
   },
   questionList: {
      margin: "20px 0px",
   },
   answer: {
      padding: "10px",
   },
   answerContent: {
      padding: "10px",
   },
   addButton: {
      margin: "10px auto",
      display: "block",
   },
   buttonAlign: {
      textAlign: "center",
   },
}));

function Question({ productList, setOpen }) {
   const [list, setList] = useState([]);
   const [onAdd, setOnAdd] = useState(false);
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(-1);
   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };
   const [pageNum, setPageNum] = useState(1);
   const [page, setPage] = useState(1);
   const [newQuestion, setNewQuestion] = useState({
      title: "",
      detail: "",
      ProductId: productList.Ordered[0].id,
   });
   //먼저 문의 내역 확인
   useEffect(() => {
      //받고 0개이면 OnAdd true
      const getQuestions = async () => {
         await axios
            .get(`/api/question/user/all/${productList.id}`)
            .then((res) => {
               const data = res.data.data;
               setList(data);
               if (data.length === 0) {
                  setOnAdd(true);
               }
               setPageNum(Math.floor(data.length / 6 + 1));
            });
      };
      getQuestions();
   }, [productList]);

   const AccordionItem = (item, idx) => {
      return (
         <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
            <AccordionSummary
               aria-controls="panel1bh-content"
               id="panel1bh-header">
               <Typography className={classes.secondaryHeading}>
                  {MiliToyymmdd(item.createdAt)}
               </Typography>
               <Typography className={classes.heading}>{item.title}</Typography>
               <Typography className={classes.secondaryHeading}>
                  {item.isAnswer ? <>답변등록</> : <>답변미등록</>}
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>{item.detail}</Typography>
            </AccordionDetails>
            {item.answer && (
               <div className={classes.answer}>
                  <Divider />
                  <div className={classes.answerContent}>
                     <Typography variant="h6">답변</Typography>
                     <br />
                     <Typography>{item.answer}</Typography>
                  </div>
               </div>
            )}
         </Accordion>
      );
   };
   const onChange = (e) => {
      let {
         target: { name, value },
      } = e;
      if (name === "ProductId") {
         value = parseInt(value);
      } else if (name === "title" && value.length > 50) {
         window.alert("제목은 최대 50자까지 입력 가능합니다.");
         return;
      }
      setNewQuestion((prev) => ({ ...prev, [name]: value }));
   };
   const onClickSubmit = async () => {
      await axios
         .post("/api/question", {
            ...newQuestion,
            OrderHistoryId: productList.id,
         })
         .then(() => {
            setNewQuestion({
               title: "",
               detail: "",
               ProductId: productList.Ordered[0].id,
            });
            setOnAdd(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const onClickCancel = () => {
      setNewQuestion({
         title: "",
         detail: "",
         ProductId: productList.Ordered[0].id,
      });
      setOnAdd(false);
   };
   return (
      <div>
         {onAdd ? (
            <div style={{ padding: "10px" }}>
               <Typography variant="h5">문의 등록</Typography>
               <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">상품선택</InputLabel>
                  <Select
                     native
                     value={newQuestion.ProductId}
                     onChange={onChange}
                     inputProps={{
                        name: "ProductId",
                        id: "ProductId",
                     }}>
                     {productList.Ordered.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                     })}
                  </Select>
               </FormControl>
               <TextField
                  id="new-title"
                  value={newQuestion.title}
                  margin="normal"
                  name="title"
                  onChange={onChange}
                  fullWidth
                  label="제목"
               />
               <TextField
                  id="new-detail"
                  value={newQuestion.detail}
                  margin="normal"
                  name="detail"
                  onChange={onChange}
                  fullWidth
                  label="내용"
                  multiline
                  rows="10"
               />
               <div className={classes.buttonAlign}>
                  <Button
                     variant="outlined"
                     color="primary"
                     onClick={onClickSubmit}>
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
            </div>
         ) : (
            <>
               <Typography variant="h5">문의 내역</Typography>
               <div className={classes.questionList}>
                  {list.slice((page - 1) * 6, page * 6).map((item, idx) => {
                     return AccordionItem(item, idx);
                  })}
               </div>
               <Button
                  variant="outlined"
                  color="primary"
                  className={classes.addButton}
                  onClick={() => setOnAdd(true)}>
                  문의 추가
               </Button>
               <CustomPagination
                  onChangePage={(e, page) => setPage(page)}
                  pageNum={pageNum}
               />
            </>
         )}
      </div>
   );
}
export default Question;
