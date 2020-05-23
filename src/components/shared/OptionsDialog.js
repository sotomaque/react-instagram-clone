import React from "react";
import { useOptionsDialogStyles } from "../../styles";
import { Dialog, Zoom, Button, Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../../App';
import { UNFOLLOW_USER, DELETE_POST } from "../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

function OptionsDialog({ onClose, authorId, postId }) {
  const classes = useOptionsDialogStyles();
  const history = useHistory();
  const { currentUserId, followingIds } = React.useContext(UserContext)
  const isOwner = authorId === currentUserId;
  const buttonText = isOwner ? "Delete" : "Unfollow";
  const onClick = isOwner ? handleDeletePost : handleUnfollowUser;
  const isFollowing = followingIds.some(id => id === authorId)
  const isUnrelatedUser = !isOwner && !isFollowing;

  const [unfollowUser] = useMutation(UNFOLLOW_USER)
  const [deletePost] = useMutation(DELETE_POST)

  async function handleDeletePost() {
    const variables = {
      postId,
      userId: currentUserId
    }
    await deletePost({ variables });
    onClose();
    history.push('/');
    window.location.reload();
  }


  function handleUnfollowUser() {
    const variables = {
      userIdToUnfollow: authorId,
      currentUserId
    }
    unfollowUser({ variables })
    onClose();
  }

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
      { !isUnrelatedUser &&
        <Button className={classes.redButton} onClick={onClick}>{buttonText}</Button>
      }
      <Divider />
      {/* Go to Post */}
      <Button className={classes.button}>
        <Link to={`/p/${postId}`}>
          Go to post
        </Link>
      </Button>
      <Divider />
      {/* Share */}
      <Button className={classes.button}>
          Share
      </Button>
      <Divider />
      {/* Copy Link */}
      <Button className={classes.button}>
          Copy Link
      </Button>
      <Divider />
      {/* Cancel */}
      <Button className={classes.button} onClick={onClose} >
        Cancel
      </Button>
    </Dialog>
  )
}

export default OptionsDialog;
