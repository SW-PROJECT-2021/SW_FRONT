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
import { MiliToyymmdd } from "../../../utils/MiliToyymmdd";

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
  noReview: {
    textAlign: "center",
  },
}));

function Review({ reviews, userId }) {
  const [list, setList] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(-1);
  const [pageNum, setPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setList(reviews);
  }, [reviews]);

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
  const AccordionItem = (item, idx) => {
    return (
      <Accordion expanded={expanded === idx} onChange={handleChange(idx)}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={classes.secondaryHeading}>
            {item.delivery !== 3 ? (
              item.delivery !== 2 ? (
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
            {item.recommand !== 3 ? (
              item.recommand !== 2 ? (
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
            {hideUserName(userId)}
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
        {list.length !== 0 ? (
          <>
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
              {list.slice((page - 1) * 5, page * 5).map((item, idx) => {
                return AccordionItem(item, idx);
              })}
            </div>
          </>
        ) : (
          <Typography variant="h5" className={classes.noReview}>
            아직 등록된 상품평이 없습니다.
          </Typography>
        )}
      </div>
    </article>
  );
}
export default Review;
