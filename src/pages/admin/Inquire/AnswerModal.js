import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { DateChange } from "../../../utils/DateChange";
import {
  postAnswerAction,
  postAnswerClear,
} from "../../../stores/actions/inquireAction";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function AnswerModal({ open, handleClose }) {
  const [answerText, setAnswerText] = useState("");
  const onAnswerHandler = useCallback(
    (e) => {
      setAnswerText(e.target.value);
    },
    [answerText]
  );
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.InquireReducer.questiondetail
  );
  const postState = useSelector(
    (state) => state.InquireReducer.postanswer.data
  );

  const onSubmit = useCallback(
    (id) => {
      if (answerText) {
        let data = {
          id: id,
          answer: answerText,
        };
        console.log(data);
        dispatch(postAnswerAction(data));
      } else {
        alert("답변을 입력하세요");
      }
    },
    [answerText]
  );

  useEffect(() => {
    if (postState) {
      alert("답변 등록성공");
      dispatch(postAnswerClear());
      window.location.reload();
    }
  }, [postState]);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return null;
  console.log(data);
  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth="true"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          문의사항
        </DialogTitle>
        <DialogContent dividers>
          <Contents>
            <div className="block">
              <span className="title">문의 제목 </span>
              <span className="titleText">{data.title}</span>
            </div>
            <div className="block">
              <span className="title">상세 정보</span>
              <span className="titleText">{data.detail}</span>
            </div>
            <div className="block">
              <ul className="list-body">
                <li className="list-small">상품 이름</li>
                <li className="list-middle">구매 날짜</li>
                <li className="list-middle">문의 날짜</li>
                <li className="list-small">배송 지</li>
                <li className="list-small">답변 여부</li>
              </ul>
              <ul className="list-body">
                <li className="list-small">{data.ProductName}</li>
                <li className="list-middle">{DateChange(data.orderDate)}</li>
                <li className="list-middle">{DateChange(data.createdAt)}</li>
                <li className="list-small">{data.orderDestination}</li>
                <li className="list-small">
                  {data.answer === null ? (
                    <span>미답변</span>
                  ) : (
                    <span>답변완료</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="block">
              {data.answer === null ? (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="답변내용"
                    size="small"
                    multiline
                    rows={4}
                    id="Answer"
                    name="Answer"
                    type="text"
                    autoFocus
                    value={answerText}
                    onChange={onAnswerHandler}
                  />
                  <Button onClick={() => onSubmit(data.id)}>답변 제출</Button>
                </>
              ) : (
                <>
                  <span className="title">답변 내용</span>
                  <span className="titleText">{data.answer}</span>
                </>
              )}
            </div>
          </Contents>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AnswerModal;

const Contents = styled.div`
  ul {
    padding: 0;
    width: 100%;
    height: auto;
    align-items: center;
    text-align: center;
    text-decoration: none;
    display: flex;
    list-style: none;
    font-family: "NanumSquareBold";
    margin-top: 10px;
    margin-right: 0;
  }
  li {
    margin-bottom: 10px;
  }
  .list-header {
    color: #191970;
    border-top: 2px solid #a9a9a9;
    border-bottom: 2px solid #a9a9a9;
    font-size: 1.1rem;
  }
  .list-small {
    width: 15%;
  }
  .list-verysmall {
    width: 7%;
  }
  .list-large {
    width: 40%;
  }
  .list-middle {
    width: 25%;
  }
  .list-body {
    color: #2f4f4f;
    border-bottom: 0.1px solid #a9a9a9;
  }
  .title {
    font-size: 1.3rem;
    font-family: "NanumSquareBold";
    margin-right: 20px;
  }
  .titleText {
    font-size: 1.2rem;
    font-family: "NanumSquareBold";
  }
  .block {
    margin-bottom: 10px;
  }
`;
