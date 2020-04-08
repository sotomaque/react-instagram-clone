import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CloseIcon } from '../../icons';
import { usePostModalStyles } from "../../styles";

import Modal from 'react-modal';
import Post from './Post'

function PostModal() {
  const history = useHistory();
  const { postId } = useParams();
  const classes = usePostModalStyles();

  return (
    <>
      <Modal
        isOpen
        ariaHideApp={false}
        overlayClassName={classes.overlay}
        onRequestClose={() => history.goBack()}
        style={{
          content: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 935,
            width: "100%",
            top: "10%",
            left: "20%",
            right: "auto",
            bottom: "auto",
            tranform: "translate(-50%, -50%)",
            margin: "auto",
            padding: 0,
            overflow: "none",
            WebkitOverflowScrolling: "touch"
          }
        }}
      >
        <Post id={postId} />
      </Modal>

      <div onClick={() => history.goBack() } className={classes.close}>
        <CloseIcon />
      </div>
    </>
  );
}

export default PostModal;
