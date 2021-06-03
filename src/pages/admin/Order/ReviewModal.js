import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReivewsAction } from "../../../stores/actions/orderAction";
import ReviewDetail from "./ReviewDetail";

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function ReviewModal({ open, handleClose, modalId, userId }) {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.OrderReducer.orderreview
  );
  useEffect(() => {
    dispatch(getOrderReivewsAction(modalId));
  }, [modalId]);

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
          상품평
        </DialogTitle>
        <DialogContent dividers>
          <ReviewDetail reviews={data} userId={userId}></ReviewDetail>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReviewModal;
