import React from "react";
import { useGridPostStyles } from "../../styles";
import { Typography } from "@material-ui/core";

function GridPost({ post }) {
  const classes = useGridPostStyles();

  return (
    <div className={classes.gridPostContainer}>
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
      <img src={post.media} alt="Post Cover Image" className={classes.image} />
   </div>
  );
}

export default GridPost;
