import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   makeStyles,
   Typography,
} from "@material-ui/core";
import {
   SignalCellular2BarRounded,
   SignalCellular3BarRounded,
   SignalCellular4BarRounded,
   ThumbDown,
   ThumbsUpDown,
   ThumbUp,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { MiliToyymmdd } from "../../utils/MiliToyymmdd";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "60%",
      lineHeight: "42px",
      flexShrink: 0,
   },
   secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "20%",
      textAlign: "center",
   },
   secondaryContent: {
      lineHeight: "42px",
   },
   headerCell: {
      display: "flex",
      padding: "0px 16px",
      height: "42px",
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
}));
const temp = [
   {
      shipment: 0,
      recommend: 2,
      detail: "너무 잘쓰고 있어요",
      createdAt: 1619350000000,
      userName: "신*일",
   },
   {
      shipment: 2,
      recommend: 1,
      detail:
         "안녕하세요~ 일*머*큽니다~음~ 반갑습니다~음~ 어이~ 저따라서 비트코인 했다가~으~ 피본사람 많죠~으이 으흐흐 나는 돈이 많으니까 상관없는데 여러분은 조심하셔야해 으이 암튼 테슬라 주식 언능 사! 화성 갈끄니까아~! 어흐흐흐흫",
      createdAt: 1619350000000,
      userName: "일*머*크",
   },
];

function Review() {
   const [list, setList] = useState([]);
   const classes = useStyles();
   const [expanded, setExpanded] = useState(-1);
   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   useEffect(() => {
      //받고 0개이면 OnAdd true
      setList(temp);
   }, []);
   const AccordionItem = (item, idx) => {
      return (
         <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
            <AccordionSummary
               aria-controls="panel1bh-content"
               id="panel1bh-header"
            >
               <Typography className={classes.secondaryHeading}>
                  {item.shipment !== 0 ? (
                     item.shipment !== 1 ? (
                        <div className={classes.secondaryContent}>
                           <SignalCellular2BarRounded color="secondary" />
                        </div>
                     ) : (
                        <div className={classes.secondaryContent}>
                           <SignalCellular3BarRounded />
                        </div>
                     )
                  ) : (
                     <div className={classes.secondaryContent}>
                        <SignalCellular4BarRounded color="primary" />
                     </div>
                  )}
               </Typography>
               <Typography className={classes.secondaryHeading}>
                  {item.shipment !== 0 ? (
                     item.shipment !== 1 ? (
                        <div className={classes.secondaryContent}>
                           <ThumbDown color="secondary" />
                        </div>
                     ) : (
                        <div className={classes.secondaryContent}>
                           <ThumbsUpDown />
                        </div>
                     )
                  ) : (
                     <div className={classes.secondaryContent}>
                        <ThumbUp color="primary" />
                     </div>
                  )}
               </Typography>
               <Typography className={classes.heading}>
                  {item.detail.length > 20
                     ? `${item.detail.slice(0, 20)}.............`
                     : item.detail}
               </Typography>
               <Typography className={classes.secondaryHeading}>
                  {item.userName}
                  <br />
                  {MiliToyymmdd(item.createdAt)}
               </Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>{item.detail}</Typography>
            </AccordionDetails>
         </Accordion>
      );
   };
   return (
      <article className="card mt-5">
         <div className="card-body">
            <Typography variant="h5">상품평</Typography>

            <div className={classes.questionList}>
               <div className={classes.headerCell}>
                  <span
                     className={classes.secondaryHeading}
                     style={{ lineHeight: "42px" }}
                  >
                     배송속도
                  </span>
                  <span
                     className={classes.secondaryHeading}
                     style={{ lineHeight: "42px" }}
                  >
                     추천
                  </span>
                  <span className={classes.heading}>내용</span>
                  <span
                     className={classes.secondaryHeading}
                     style={{ lineHeight: "42px" }}
                  >
                     작성자/일자
                  </span>
               </div>
               {list.map((item, idx) => {
                  return AccordionItem(item, idx);
               })}
            </div>
         </div>
      </article>
   );
}
export default Review;
