import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Divider,
   TextField,
   Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MiliToyymmdd } from "../../utils/MiliToyymmdd";
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
const temp = [
   {
      id: 1,
      subject: "배송이 느려요.",
      detail: "3달째 안오고 있어요",
      answer: "",
      createdAt: 1619344686153,
   },
   {
      id: 2,
      subject: "배송이 느려요. 몇번째임 이게?",
      detail: "빨리좀 해주세요",
      answer: "즐",
      createdAt: 1619350000000,
   },
];

function Question({ id, setOpen }) {
   const [list, setList] = useState([]);
   const [onAdd, setOnAdd] = useState(false);
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(-1);
   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };
   const [newQuestion, setNewQuestion] = useState({
      subject: "",
      detail: "",
   });

   //먼저 문의 내역 확인
   useEffect(() => {
      //받고 0개이면 OnAdd true
      setList(temp);
      if (temp.length === 0) {
         setOnAdd(true);
      }
   }, []);

   const AccordionItem = (item, idx) => {
      return (
         <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
            <AccordionSummary
               aria-controls="panel1bh-content"
               id="panel1bh-header"
            >
               <Typography className={classes.secondaryHeading}>
                  {MiliToyymmdd(item.createdAt)}
               </Typography>
               <Typography className={classes.heading}>
                  {item.subject}
               </Typography>
               <Typography className={classes.secondaryHeading}>
                  {item.answer ? <>답변등록</> : <>답변미등록</>}
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
      const {
         target: { name, value },
      } = e;
      setNewQuestion((prev) => ({ ...prev, [name]: value }));
   };
   const onClickSubmit = () => {
      let newObj = {
         ...newQuestion,
         createdAt: Date.now(),
         answer: "",
      };
      setList((prev) => [...prev, newObj]);
      setOnAdd(false);
   };
   const onClickCancel = () => {
      setNewQuestion({ subject: "", detail: "" });
      setOnAdd(false);
   };
   return (
      <div>
         {onAdd ? (
            <div style={{ padding: "10px" }}>
               <Typography variant="h5">문의 등록</Typography>
               <TextField
                  id="new-subject"
                  value={newQuestion.subject}
                  margin="normal"
                  name="subject"
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
                     onClick={onClickSubmit}
                  >
                     문의 등록
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                     variant="outlined"
                     color="secondary"
                     onClick={onClickCancel}
                  >
                     취소
                  </Button>
               </div>
            </div>
         ) : (
            <>
               <Typography variant="h5">문의 내역</Typography>
               <div className={classes.questionList}>
                  {list.map((item, idx) => {
                     return AccordionItem(item, idx);
                  })}
               </div>
               <Button
                  variant="outlined"
                  color="primary"
                  className={classes.addButton}
                  onClick={() => setOnAdd(true)}
               >
                  문의 추가
               </Button>
            </>
         )}
      </div>
   );
}
export default Question;
