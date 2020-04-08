import React from "react";
import { useOptionsDialogStyles } from "../../styles";
import { Dialog, Zoom, Button, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { defaultPost } from '../../data';

function OptionsDialog({ onClose }) {
  const classes = useOptionsDialogStyles();


  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      {/* Unfollow */}
      <Button className={classes.redButton}>Unfollow</Button>
      <Divider />
      {/* Go to Post */}
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Go to post
        </Link>
      </Button>
      <Divider />
      {/* Share */}
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Share
        </Link>
      </Button>
      <Divider />
      {/* Copy Link */}
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Copy Link
        </Link>
      </Button>
      <Divider />
      {/* Cancel */}
      <Button className={classes.button} onClick={onClose} >
        <Link to={`/p/${defaultPost.id}`}>
          Cancel
        </Link>
      </Button>
    </Dialog>
  )
}

export default OptionsDialog;
