import { makeStyles, Modal } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
   modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
   modelPaper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      width: "500px",
      height: "600px",
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),
      overflowY: "scroll",
   },
}));
function CustomModal({ children, open, setOpen }) {
   const classes = useStyles();
   return (
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         className={classes.modal}
         open={open}
         onClose={() => setOpen(false)}
      >
         <div className={classes.modelPaper}>{children}</div>
      </Modal>
   );
}
export default CustomModal;
