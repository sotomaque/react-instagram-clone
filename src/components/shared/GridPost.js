import React from "react";
import { useGridPostStyles } from "../../styles";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function GridPost({ post }) {
  const history = useHistory();

  const classes = useGridPostStyles();

  function handleOpenPostModal() {
    history.push({
      pathname: `/p/${post.id}`,
      state: { modal: true } 
    });
  }

  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      {/* Post Overlay */}
      <div className={classes.gridPostOverlay}>

        {/* Post Likes */}
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>{post.likes}</Typography>
        </div>

        {/* Post Comments */}
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>{post.comments.length}</Typography>
        </div>
      </div>
      {/* Post Media */}
      <img src={post.media} alt="Post Cover Media" className={classes.image} />
   </div>
  );
}

export default GridPost;
